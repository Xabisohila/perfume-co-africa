import { NextRequest, NextResponse } from "next/server";
import { createOrder, type OrderItem } from "@/lib/db";
import { buildPayFastFields } from "@/lib/payfast";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { customerName, customerEmail, items, shipping } = body as {
      customerName: string;
      customerEmail: string;
      items: OrderItem[];
      shipping: number;
    };

    // Basic validation
    if (!customerName?.trim() || customerName.trim().length < 2) {
      return NextResponse.json({ error: "Valid name required" }, { status: 400 });
    }
    if (!customerEmail?.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }
    if (typeof shipping !== "number" || shipping < 0) {
      return NextResponse.json({ error: "Invalid shipping amount" }, { status: 400 });
    }

    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const total = subtotal + shipping;

    // Create order in DB — status defaults to "pending_payment"
    const order = await createOrder({
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim().toLowerCase(),
      subtotal,
      shipping,
      total,
      items,
    });

    // Build item name (PayFast field limit: 100 chars)
    const itemName = items
      .map((i) => `${i.name} x${i.quantity}`)
      .join(", ")
      .slice(0, 100);

    const { fields, action } = buildPayFastFields({
      orderId: order.id,
      total: order.total,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim().toLowerCase(),
      itemName,
    });

    console.log(`[PayFast] Order created: ${order.id} | Total: R${total.toFixed(2)}`);

    return NextResponse.json({ fields, action, orderId: order.id });
  } catch (err) {
    console.error("[create-payment]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
