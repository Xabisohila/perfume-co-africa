import { NextRequest, NextResponse } from "next/server";
import { createOrder, type OrderItem } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password, customerName, customerEmail, items, shipping } = body as {
      password: string;
      customerName: string;
      customerEmail: string;
      items: OrderItem[];
      shipping: number;
    };

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    if (!customerName?.trim() || customerName.trim().length < 2) {
      return NextResponse.json({ error: "Valid name required" }, { status: 400 });
    }
    if (!customerEmail?.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Add at least one item" }, { status: 400 });
    }

    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const total = subtotal + shipping;

    const order = await createOrder({
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim().toLowerCase(),
      subtotal,
      shipping,
      total,
      items,
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    return NextResponse.json({
      orderId: order.id,
      trackingUrl: `${baseUrl}/orders/track?id=${order.id}`,
    });
  } catch (err) {
    console.error("[admin/orders]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
