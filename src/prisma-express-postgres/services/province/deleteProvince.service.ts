import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const deleteProvinceService = async (id: number) => {
	return await prisma.province.delete({where:{id}});
}

export default deleteProvinceService