CREATE TABLE "members" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "address" TEXT NOT NULL,
  "phone_wa" TEXT NOT NULL,
  "password_hash" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "members_email_key" ON "members"("email");

CREATE TABLE "orders" (
  "id" TEXT NOT NULL,
  "member_id" TEXT NOT NULL,
  "subtotal_amount" INTEGER NOT NULL,
  "ppn_amount" INTEGER NOT NULL,
  "total_amount" INTEGER NOT NULL,
  "payment_status" TEXT NOT NULL DEFAULT 'pending',
  "payment_provider" TEXT NOT NULL DEFAULT 'midtrans',
  "payment_ref" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "orders_member_id_idx" ON "orders"("member_id");
ALTER TABLE "orders" ADD CONSTRAINT "orders_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "order_items" (
  "id" TEXT NOT NULL,
  "order_id" TEXT NOT NULL,
  "product_id" TEXT NOT NULL,
  "product_name" TEXT NOT NULL,
  "unit_price" INTEGER NOT NULL,
  "quantity" INTEGER NOT NULL,
  "line_total" INTEGER NOT NULL,
  CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "order_items_order_id_idx" ON "order_items"("order_id");
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
