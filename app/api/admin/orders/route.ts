import { NextRequest, NextResponse } from "next/server";
import { createOrder, getAllOrders, updateOrderStatus, type OrderItem, type OrderStatus } from "@/lib/db";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const password = auth?.replace("Bearer ", "");
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const orders = await getAllOrders();
  return NextResponse.json({ orders });
}

export async function PATCH(req: NextRequest) {
  try {
    const { password, orderId, status } = (await req.json()) as {
      password: string;
      orderId: string;
      status: OrderStatus;
    };
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }
    const allowed: OrderStatus[] = [
      "pending_payment", "paid", "order_confirmed",
      "processing", "in_transit", "delivered",
      "failed", "cancelled",
    ];
    if (!allowed.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    await updateOrderStatus(orderId, status);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/orders PATCH]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

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
