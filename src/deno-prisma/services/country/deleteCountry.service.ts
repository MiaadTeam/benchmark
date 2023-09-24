import { PrismaClient } from "./../../generated/client";

const prisma = new PrismaClient()

const deleteCountryService = async (id: number) => {
	return await prisma.country.delete({
		where: {
			id
		}
	});
}

export default deleteCountryService