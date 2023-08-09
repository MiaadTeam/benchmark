
const getFiftyCitiesOfCountryService = async ( countryId: number,limit = 50, _pageNumber =1 ) => {
	// const input = countryId ? {_id : countryId} : {}
	// 		return await Country.findAll( input )
		// .({
// 			path: 'provinces',
// 			options: {
// 				limit: limit,
// 			},
// 			populate: {
// 				path: 'cities',
// 				model: City,
// 				options: {
// 					limit: limit,
// 					// sort: { created: -1},
//        				// skip: pageNumber*limit
// 				}
// 			}
// 		}).exec()
}

export default getFiftyCitiesOfCountryService
