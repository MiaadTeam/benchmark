import { PrismaClient } from "../../generated/client";

const deleteProvinceService = async (id: number) => {
	const prisma = new PrismaClient()
	return await prisma.province.delete({
		where: {
			id
		}
	});
}

export default deleteProvinceService