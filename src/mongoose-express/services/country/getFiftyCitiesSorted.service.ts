import mongoose from "mongoose";
import { City } from "../../models/City";
import { Country } from "../../models/Country";

const getFiftyCitiesSortedService = async ( countryId:mongoose.Types.ObjectId, pageNumber=0, limit = 50, _pageNumber =1 ) => {
	const input = countryId ? {_id : countryId} : {}
	return await Country.find( input )
		.populate({
			path: 'provinces',
			options: {
				limit: limit,
			},
			populate: {
				path: 'cities',
				model: City,
				options: {
					limit: limit,
					sort: { created: -1},
       				skip: pageNumber*limit
				}
			}
		}).exec()
}

export default getFiftyCitiesSortedService
