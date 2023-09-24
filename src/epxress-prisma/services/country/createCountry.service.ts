import { PrismaClient } from "@prisma/client";
import { log } from "console";
const prisma = new PrismaClient()



const createCountryService = async (countryInput: any) => {
	log(countryInput.name)
	return await prisma.country.create({
		data: countryInput
	});	
}

export default createCountryService