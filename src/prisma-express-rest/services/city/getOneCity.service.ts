import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const getCityService = async (_id : number) => {
	return await prisma.city.findFirst({
		where: {
			id: _id
		}
	});	
}

export default getCityService