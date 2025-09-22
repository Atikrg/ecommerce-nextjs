import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // optional: see queries in dev
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
