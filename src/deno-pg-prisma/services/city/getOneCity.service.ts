import { PrismaClient } from "./../../generated/client";


const getCityService = async (_id : number) => {
	const prisma = new PrismaClient()
	const city = await prisma.city.findFirst({
		where: {
			id: _id
		}
	});	
	await prisma.$disconnect()
	return city
}

export default getCityService