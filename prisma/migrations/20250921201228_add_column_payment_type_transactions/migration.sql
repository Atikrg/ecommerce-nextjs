/*
  Warnings:

  - Added the required column `payment_type` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Transactions" ADD COLUMN     "payment_type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."TransactionsOrder" ALTER COLUMN "orderIds" SET DATA TYPE TEXT;
