/*
  Warnings:

  - Changed the type of `payment_type` on the `Transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."PaymentType" AS ENUM ('RAZORPAY', 'CARD', 'CASH', 'UPI');

-- AlterTable
ALTER TABLE "public"."Transactions" DROP COLUMN "payment_type",
ADD COLUMN     "payment_type" "public"."PaymentType" NOT NULL;

-- AlterTable
ALTER TABLE "public"."TransactionsOrder" ALTER COLUMN "orderIds" SET DATA TYPE TEXT[];
