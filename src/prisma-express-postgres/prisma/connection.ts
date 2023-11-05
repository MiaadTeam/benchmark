import { PrismaClient } from "@prisma/client";

// Prisma Connection
const prisma = new PrismaClient();
export const createPrismaConnection = async () => {
	await prisma.$connect();
	console.info("Postgres( prisma ) Connected!");
}  