import { PrismaClient } from '../../generated/client/index.js';

const createCountryService = async (countryInput: any, runningClient?:any) => {
	const prisma =runningClient || new PrismaClient()
	console.log(countryInput.name)
	return await prisma.country.create({
		data: countryInput
	});	
}

export default createCountryService