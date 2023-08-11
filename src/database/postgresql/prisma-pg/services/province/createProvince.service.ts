import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const createProvinceService = async (provinceInput: any) => {
	return await prisma.province.create({
		data: provinceInput
	});	
}

export default createProvinceService