import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const getManyProvinces = async ( limit:number, skip=0) => {
	return await prisma.province.findMany({
		take:limit,
		skip:skip
	});	
}

export default getManyProvinces