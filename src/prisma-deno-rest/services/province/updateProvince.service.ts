import { PrismaClient } from "./../../generated/client";

const prisma = new PrismaClient()

const updateProvinceService = async (_id: number, updatedProvince:any ) => {
	return await prisma.province.update({
		where: {
			id: _id
		},
		data: updatedProvince
	} );
}

export default updateProvinceService