ALTER TABLE "members" ADD COLUMN "is_affiliate" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "affiliate_photos" JSONB NOT NULL DEFAULT '[]',
  ADD COLUMN "cart" JSONB NOT NULL DEFAULT '[]';
CREATE TABLE "member_sessions" (
  "token_hash" TEXT PRIMARY KEY,
  "member_id" TEXT NOT NULL REFERENCES "members"("id") ON DELETE CASCADE,
  "expires_at" TIMESTAMP(3) NOT NULL
);
CREATE INDEX "member_sessions_member_id_idx" ON "member_sessions"("member_id");
CREATE INDEX "member_sessions_expires_at_idx" ON "member_sessions"("expires_at");
