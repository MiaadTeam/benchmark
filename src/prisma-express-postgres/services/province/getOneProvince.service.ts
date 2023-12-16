import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const getProvinceService = async (_id : number) => {
	return await prisma.province.findFirst({
		where: {
			id: _id
		}
	});	
}	

export default getProvinceService