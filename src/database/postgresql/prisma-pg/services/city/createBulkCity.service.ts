import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const createBulkCityService = async ( CityInput:any) => {
	return await prisma.city.createMany({ data: CityInput})	
}

export default createBulkCityService