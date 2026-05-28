import { NextRequest, NextResponse } from "next/server";
import { getOrderById } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const email = req.nextUrl.searchParams.get("email")?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const order = await getOrderById(id);

    if (!order || order.customerEmail.toLowerCase() !== email) {
      return NextResponse.json({ error: "Order not found. Please check your order reference and email." }, { status: 404 });
    }

    return NextResponse.json({
      id: order.id,
      createdAt: order.createdAt,
      status: order.status,
      customerName: order.customerName,
      subtotal: order.subtotal,
      shipping: order.shipping,
      total: order.total,
      items: order.items,
    });
  } catch (err) {
    console.error("[orders/[id]]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
