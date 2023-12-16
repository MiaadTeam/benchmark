import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const updateCityService = async ( _id:number, updatedCity :any) => {
	return await prisma.city.update({
		where: {
			id: _id
		},
		data: updatedCity
	}, );
}

export default updateCityService