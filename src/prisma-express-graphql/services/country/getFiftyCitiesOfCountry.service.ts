import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const getFiftyCitiesOfCountryService = async (limit = 50, pageNumber = 1) => {
	return	await prisma.country.findMany({
		select: {
			name: true,
			abb: true,
			population:true,
			provinces: {
				take: limit*pageNumber,
				orderBy: {
					population: "desc"
				},
				select: {
					name: true,
					abb: true,
					population:true,
					cities: {
						select: {
							name: true,
							abb: true,
							population:true,
						},
						take: limit,
						orderBy: {
							population: "desc"
						},
					}
				}
			}
		}
	})
}

export default getFiftyCitiesOfCountryService
