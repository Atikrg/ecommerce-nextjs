-- CreateTable
CREATE TABLE "public"."Transactions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "total_amount" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TransactionsOrder" (
    "id" SERIAL NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "orderIds" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TransactionsOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Transactions" ADD CONSTRAINT "Transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TransactionsOrder" ADD CONSTRAINT "TransactionsOrder_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "public"."Transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
