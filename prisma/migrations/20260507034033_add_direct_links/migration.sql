-- CreateTable
CREATE TABLE "direct_links" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "buttons" JSONB NOT NULL DEFAULT '[]',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "direct_links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "direct_links_name_key" ON "direct_links"("name");
