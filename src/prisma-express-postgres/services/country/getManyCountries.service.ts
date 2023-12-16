import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const getManyCountries = async ( limit:number, skip=0) => {
	return await prisma.country.findMany({
		take:limit,
		skip:skip
	});	
}

export default getManyCountries