import { PrismaClient } from "./../../generated/client";


const deleteCityService = async (id: number) => {
	const prisma = new PrismaClient()
	const result = await prisma.city.delete({
		where: {
			id
		}
	});
	await prisma.$disconnect()
	return result
}
export default deleteCityService