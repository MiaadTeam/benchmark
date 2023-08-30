import { PrismaClient } from "./../../generated/client";

const createCityService = async (CityInput : any, runningClient?:any) => {
	const prisma = runningClient || new PrismaClient()
	return await prisma.city.create({

		data: CityInput
	});	
}

export default createCityService