import { PrismaClient } from "../../generated/client";

const getProvinceService = async (_id : number) => {
	const prisma = new PrismaClient()
	return await prisma.province.findFirst({
		where: {
			id: _id
		}
	});	
}

export default getProvinceService