import { PrismaClient } from "@prisma/client";

// Prisma Connection
export const prisma = new PrismaClient();
prisma.$connect();
console.info("Postgres: Connected");