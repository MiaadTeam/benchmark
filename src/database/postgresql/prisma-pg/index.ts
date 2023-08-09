import { PrismaClient } from "@prisma/client";

// Prisma Connection
export const createPrismaConnection = async () => {
	const prisma = new PrismaClient();
	await prisma.$connect();
	console.info("Postgres: Connected");
}