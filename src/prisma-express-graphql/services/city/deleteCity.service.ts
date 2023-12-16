import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const deleteCityService = async (id: number) => {
	return await prisma.city.delete({
		where: {
			id
		}
	});
}

export default deleteCityService