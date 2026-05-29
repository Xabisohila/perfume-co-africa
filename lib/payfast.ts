import crypto from "crypto";

const SANDBOX_URL = "https://sandbox.payfast.co.za/eng/process";
const LIVE_URL = "https://www.payfast.co.za/eng/process";
const SANDBOX_VALIDATE_URL = "https://sandbox.payfast.co.za/eng/query/validate";
const LIVE_VALIDATE_URL = "https://www.payfast.co.za/eng/query/validate";

export function isSandbox() {
  return process.env.PAYFAST_SANDBOX === "true";
}

export function getPayFastUrl() {
  return isSandbox() ? SANDBOX_URL : LIVE_URL;
}

function getValidateUrl() {
  return isSandbox() ? SANDBOX_VALIDATE_URL : LIVE_VALIDATE_URL;
}

// Match PHP urlencode() exactly — encodes spaces as '+' and also encodes
// ! ' ( ) * ~ which encodeURIComponent leaves unencoded.
function pfEncode(val: string): string {
  return encodeURIComponent(val.trim())
    .replace(/%20/g, "+")
    .replace(/[!'()*~]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());
}

/**
 * Generate a PayFast MD5 signature from an ordered set of fields.
 * Pass fields in the exact order they appear in the payment form.
 */
export function generateSignature(
  data: Record<string, string>,
  passphrase?: string
): string {
  const parts = Object.entries(data)
    .filter(([, v]) => v !== "")
    .map(([k, v]) => `${k}=${pfEncode(v)}`);

  let sigString = parts.join("&");

  if (passphrase) {
    sigString += `&passphrase=${pfEncode(passphrase)}`;
  }

  return crypto.createHash("md5").update(sigString).digest("hex");
}

export type PayFastFields = Record<string, string>;

/**
 * Build the complete set of fields to POST to PayFast.
 * Returns fields in the correct order for signature generation.
 */
export function buildPayFastFields(params: {
  orderId: string;
  total: number;
  customerName: string;
  customerEmail: string;
  itemName: string;
}): { fields: PayFastFields; signature: string; action: string } {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const passphrase = process.env.PAYFAST_PASSPHRASE ?? "";

  // Fields must be in this exact order per PayFast spec
  const fields: PayFastFields = {
    merchant_id: process.env.PAYFAST_MERCHANT_ID ?? "",
    merchant_key: process.env.PAYFAST_MERCHANT_KEY ?? "",
    return_url: `${baseUrl}/payment/success?order_id=${params.orderId}`,
    cancel_url: `${baseUrl}/payment/cancel?order_id=${params.orderId}`,
    notify_url: `${baseUrl}/api/payfast/itn`,
    name_first: params.customerName.split(" ")[0] ?? params.customerName,
    name_last: params.customerName.split(" ").slice(1).join(" ") || "",
    email_address: params.customerEmail,
    m_payment_id: params.orderId,
    amount: params.total.toFixed(2),
    item_name: params.itemName,
    custom_str1: params.orderId,
  };

  // Remove empty values before signing
  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([, v]) => v !== "")
  );

  const signature = generateSignature(filteredFields, passphrase);

  return {
    fields: { ...filteredFields, signature },
    signature,
    action: getPayFastUrl(),
  };
}

/**
 * Validate an ITN (Instant Transaction Notification) from PayFast.
 *
 * Steps:
 * 1. Verify signature matches
 * 2. Ping PayFast validate endpoint to confirm the transaction is genuine
 * 3. Check payment_status
 * 4. Check amount matches expected order total
 */
export async function validateITN(
  body: Record<string, string>,
  expectedTotal: number
): Promise<{ valid: boolean; reason?: string }> {
  const passphrase = process.env.PAYFAST_PASSPHRASE ?? "";

  // 1 — Signature check
  const { signature: receivedSig, ...dataWithoutSig } = body;
  const calculatedSig = generateSignature(dataWithoutSig, passphrase);

  if (calculatedSig !== receivedSig) {
    return { valid: false, reason: "Signature mismatch" };
  }

  // 2 — PayFast server validation (prevents replay attacks)
  try {
    const pfBody = Object.entries(body)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join("&");

    const res = await fetch(getValidateUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: pfBody,
    });

    const text = await res.text();
    if (text.trim() !== "VALID") {
      return { valid: false, reason: `PayFast validate returned: ${text.trim()}` };
    }
  } catch (err) {
    return { valid: false, reason: `Validate request failed: ${String(err)}` };
  }

  // 3 — Payment status
  if (body.payment_status !== "COMPLETE") {
    return { valid: false, reason: `Payment status is ${body.payment_status}` };
  }

  // 4 — Amount match (compare to 2 decimal places)
  const receivedAmount = parseFloat(body.amount_gross ?? "0");
  if (Math.abs(receivedAmount - expectedTotal) > 0.01) {
    return {
      valid: false,
      reason: `Amount mismatch: received ${receivedAmount}, expected ${expectedTotal}`,
    };
  }

  return { valid: true };
}
