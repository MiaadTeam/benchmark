import { PrismaClient } from "../../generated/client";

const createProvinceService = async (provinceInput: any, runningClient?:any ) => {
	const prisma = runningClient || new PrismaClient()
	return await prisma.province.create({
		data: provinceInput
	});	
}

export default createProvinceService