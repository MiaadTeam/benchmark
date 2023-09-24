import { PrismaClient } from "./../../generated/client";

const updateCityService = async ( _id:number, updatedCity:any ) => {
	const prisma = new PrismaClient()
	return await prisma.city.update({
		where: {
			id: _id
		},
		data: updatedCity
	}, );
}

export default updateCityService