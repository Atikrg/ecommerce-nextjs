/*
  Warnings:

  - The `orderIds` column on the `TransactionsOrder` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."TransactionsOrder" DROP COLUMN "orderIds",
ADD COLUMN     "orderIds" INTEGER[];
