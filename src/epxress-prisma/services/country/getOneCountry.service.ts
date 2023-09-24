import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const getCountryService = async (_id : number) => {
	return await prisma.country.findFirst({
		where: {
			id: _id
		}
	});	
}

export default getCountryService