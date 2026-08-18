ALTER TABLE "members"
ADD COLUMN "referral_code" TEXT,
ADD COLUMN "referred_by_id" TEXT;

UPDATE "members"
SET "referral_code" = UPPER(SUBSTRING(REPLACE("id", '-', '') FROM 1 FOR 10));

ALTER TABLE "members" ALTER COLUMN "referral_code" SET NOT NULL;
CREATE UNIQUE INDEX "members_referral_code_key" ON "members"("referral_code");
ALTER TABLE "members" ADD CONSTRAINT "members_referred_by_id_fkey" FOREIGN KEY ("referred_by_id") REFERENCES "members"("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE "referral_settings" (
  "id" INTEGER NOT NULL DEFAULT 1,
  "percentage" DOUBLE PRECISION NOT NULL DEFAULT 5,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "referral_settings_pkey" PRIMARY KEY ("id")
);
INSERT INTO "referral_settings" ("id", "percentage", "updated_at") VALUES (1, 5, CURRENT_TIMESTAMP);

CREATE TABLE "referral_rewards" (
  "id" TEXT NOT NULL,
  "referrer_id" TEXT NOT NULL,
  "order_id" TEXT NOT NULL,
  "percentage_snapshot" DOUBLE PRECISION NOT NULL,
  "base_amount" INTEGER NOT NULL,
  "bonus_amount" INTEGER NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'earned',
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "referral_rewards_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "referral_rewards_order_id_key" ON "referral_rewards"("order_id");
CREATE INDEX "referral_rewards_referrer_id_status_idx" ON "referral_rewards"("referrer_id", "status");
ALTER TABLE "referral_rewards" ADD CONSTRAINT "referral_rewards_referrer_id_fkey" FOREIGN KEY ("referrer_id") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "referral_rewards" ADD CONSTRAINT "referral_rewards_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
