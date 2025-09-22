-- CreateTable
CREATE TABLE "public"."SuperAdmin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_google_register" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SuperAdmin_pkey" PRIMARY KEY ("id")
);
