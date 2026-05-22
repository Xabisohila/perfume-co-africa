import { NextRequest, NextResponse } from "next/server";
import { getOrderById, updateOrderStatus, isAlreadyProcessed } from "@/lib/db";
import { validateITN } from "@/lib/payfast";

// PayFast sends ITN as application/x-www-form-urlencoded
async function parseFormBody(req: NextRequest): Promise<Record<string, string>> {
  const text = await req.text();
  return Object.fromEntries(
    text
      .split("&")
      .map((pair) => pair.split("=").map(decodeURIComponent))
      .filter(([k]) => k)
      .map(([k, v = ""]) => [k, v])
  );
}

export async function POST(req: NextRequest) {
  let orderId = "unknown";

  try {
    const body = await parseFormBody(req);

    orderId = body.m_payment_id ?? body.custom_str1 ?? "unknown";
    const pfPaymentId = body.pf_payment_id;

    console.log(`[ITN] Received for order ${orderId} | status: ${body.payment_status}`);

    // ── Idempotency guard ───────────────────────────────────────────────────
    // PayFast retries ITN until we respond 200. If already fully processed, ack and exit.
    if (await isAlreadyProcessed(orderId)) {
      console.log(`[ITN] Order ${orderId} already processed — skipping`);
      return new NextResponse("OK", { status: 200 });
    }

    // ── Fetch order ─────────────────────────────────────────────────────────
    const order = await getOrderById(orderId);
    if (!order) {
      console.error(`[ITN] Order not found: ${orderId}`);
      // Return 200 so PayFast doesn't retry infinitely for an unknown order
      return new NextResponse("OK", { status: 200 });
    }

    // ── Validate ITN (signature + PayFast server ping + amount) ─────────────
    const { valid, reason } = await validateITN(body, order.total);

    if (!valid) {
      console.error(`[ITN] Validation failed for order ${orderId}: ${reason}`);
      await updateOrderStatus(orderId, "failed", pfPaymentId);
      return new NextResponse("OK", { status: 200 });
    }

    // ── Mark as paid ─────────────────────────────────────────────────────────
    await updateOrderStatus(orderId, "paid", pfPaymentId);
    console.log(`[ITN] ✓ Order ${orderId} marked as PAID (pf_id: ${pfPaymentId})`);

    return new NextResponse("OK", { status: 200 });
  } catch (err) {
    console.error(`[ITN] Unexpected error for order ${orderId}:`, err);
    // Still return 200 — returning 5xx causes PayFast to retry repeatedly
    return new NextResponse("OK", { status: 200 });
  }
}
