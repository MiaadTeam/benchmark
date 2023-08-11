import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


const createCityService = async (CityInput : any) => {
	return await prisma.city.create({

		data: CityInput
	});	
}

export default createCityService