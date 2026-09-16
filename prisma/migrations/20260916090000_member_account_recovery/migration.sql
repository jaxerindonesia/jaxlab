CREATE TABLE "member_action_tokens" (
  "token_hash" TEXT NOT NULL,
  "member_id" TEXT NOT NULL,
  "purpose" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "expires_at" TIMESTAMP(3) NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "member_action_tokens_pkey" PRIMARY KEY ("token_hash")
);
CREATE UNIQUE INDEX "member_action_tokens_member_id_purpose_key" ON "member_action_tokens"("member_id", "purpose");
CREATE INDEX "member_action_tokens_expires_at_idx" ON "member_action_tokens"("expires_at");
ALTER TABLE "member_action_tokens" ADD CONSTRAINT "member_action_tokens_member_id_fkey"
  FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;
