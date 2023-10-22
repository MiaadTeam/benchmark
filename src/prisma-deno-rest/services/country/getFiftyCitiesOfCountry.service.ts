import { PrismaClient } from "./../../generated/client"
const prisma = new PrismaClient()

const getFiftyCitiesOfCountryService = async (countryId?:number, limit = 50, _pageNumber =1 ) => {
	return	await prisma.country.findMany({
		where:{ id: countryId},
		select: {
			name: true,
			abb: true,
			population:true,
			provinces: {
				take: limit,
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
