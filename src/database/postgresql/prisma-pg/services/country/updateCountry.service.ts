import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const updateCountryService = async ( _id:number, updatedCountry:any ) => {
	return await prisma.country.update({
		where: {
			id: _id
		},
		data: updatedCountry
	}, );
}

export default updateCountryService