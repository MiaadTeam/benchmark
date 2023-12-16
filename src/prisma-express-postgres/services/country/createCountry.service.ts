import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const createCountryService = async (countryInput: any) => {
	return await prisma.country.create({
		data: countryInput
	});	
}

export default createCountryService