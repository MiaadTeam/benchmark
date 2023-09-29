import { PrismaClient } from "./../../generated/client"

const prisma = new PrismaClient()

const createBulkCityService = async ( CityInput:any) => {
	return await prisma.city.createMany({ data: CityInput})	
}

export default createBulkCityService