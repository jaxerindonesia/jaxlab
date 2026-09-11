ALTER TABLE "orders"
ADD COLUMN "shipping_amount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "shipping_courier" TEXT,
ADD COLUMN "shipping_service" TEXT,
ADD COLUMN "shipping_destination_id" INTEGER,
ADD COLUMN "shipping_destination" TEXT;
