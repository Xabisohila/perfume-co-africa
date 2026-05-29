import { createClient, type Client, type Row } from "@libsql/client";

export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "order_confirmed"
  | "processing"
  | "in_transit"
  | "delivered"
  | "failed"
  | "cancelled";

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type Order = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  customerName: string;
  customerEmail: string;
  subtotal: number;
  shipping: number;
  total: number;
  items: OrderItem[];
  pfPaymentId: string | null;
  itnCount: number;
};

let _client: Client | null = null;
let _bootstrapped = false;

function getClient(): Client {
  if (_client) return _client;
  _client = createClient({
    url: process.env.TURSO_DATABASE_URL ?? "file:./lib/orders.db",
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  return _client;
}

async function ensureReady(): Promise<Client> {
  const client = getClient();
  if (!_bootstrapped) {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id              TEXT PRIMARY KEY,
        createdAt       TEXT NOT NULL,
        updatedAt       TEXT NOT NULL,
        status          TEXT NOT NULL DEFAULT 'pending_payment',
        customerName    TEXT NOT NULL,
        customerEmail   TEXT NOT NULL,
        subtotal        REAL NOT NULL,
        shipping        REAL NOT NULL,
        total           REAL NOT NULL,
        items           TEXT NOT NULL,
        pfPaymentId     TEXT,
        itnCount        INTEGER NOT NULL DEFAULT 0
      )
    `);
    _bootstrapped = true;
  }
  return client;
}

function rowToOrder(row: Row): Order {
  return {
    id: row.id as string,
    createdAt: row.createdAt as string,
    updatedAt: row.updatedAt as string,
    status: row.status as OrderStatus,
    customerName: row.customerName as string,
    customerEmail: row.customerEmail as string,
    subtotal: row.subtotal as number,
    shipping: row.shipping as number,
    total: row.total as number,
    items: JSON.parse(row.items as string),
    pfPaymentId: row.pfPaymentId as string | null,
    itnCount: row.itnCount as number,
  };
}

function cuid(): string {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 10);
  return `c${ts}${rand}`;
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function createOrder(data: {
  customerName: string;
  customerEmail: string;
  subtotal: number;
  shipping: number;
  total: number;
  items: OrderItem[];
}): Promise<Order> {
  const client = await ensureReady();
  const now = new Date().toISOString();
  const id = cuid();

  await client.execute({
    sql: `
      INSERT INTO orders
        (id, createdAt, updatedAt, status, customerName, customerEmail,
         subtotal, shipping, total, items, pfPaymentId, itnCount)
      VALUES
        (?, ?, ?, 'pending_payment', ?, ?, ?, ?, ?, ?, NULL, 0)
    `,
    args: [
      id, now, now,
      data.customerName,
      data.customerEmail,
      data.subtotal,
      data.shipping,
      data.total,
      JSON.stringify(data.items),
    ],
  });

  return (await getOrderById(id))!;
}

export async function getOrderById(id: string): Promise<Order | null> {
  const client = await ensureReady();
  const result = await client.execute({
    sql: "SELECT * FROM orders WHERE id = ?",
    args: [id],
  });
  const row = result.rows[0];
  return row ? rowToOrder(row) : null;
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
  pfPaymentId?: string
): Promise<void> {
  const client = await ensureReady();
  await client.execute({
    sql: `
      UPDATE orders
      SET status      = ?,
          updatedAt   = ?,
          pfPaymentId = COALESCE(?, pfPaymentId),
          itnCount    = itnCount + 1
      WHERE id = ?
    `,
    args: [status, new Date().toISOString(), pfPaymentId ?? null, id],
  });
}

export async function getAllOrders(): Promise<Order[]> {
  const client = await ensureReady();
  const result = await client.execute(
    "SELECT * FROM orders ORDER BY createdAt DESC"
  );
  return result.rows.map(rowToOrder);
}

export async function isAlreadyProcessed(id: string): Promise<boolean> {
  const order = await getOrderById(id);
  if (!order) return false;
  return order.status === "paid" || order.itnCount > 0;
}
