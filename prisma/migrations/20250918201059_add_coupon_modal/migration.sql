-- CreateTable
CREATE TABLE "public"."CouponCodes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "discount_value" INTEGER NOT NULL,
    "discount_type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "CouponCodes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CouponCodes_name_key" ON "public"."CouponCodes"("name");
