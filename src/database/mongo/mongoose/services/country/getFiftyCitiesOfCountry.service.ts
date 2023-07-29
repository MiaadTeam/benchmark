import { Country } from "../../models/Country"

const getFiftyCitiesOfCountryService = async () => {
	return Country.aggregate(
		[
			{
				// "$match": {
				// 	provinceIds: { $exists: true, $ne: [] }
				// },
				$lookup: {
					from: 'provinces',
					let: { 'countryProvinceIds': "provinceIds" },
					"pipeline": [
						{
						  "$match": {
							"$expr": {
							  "$in": [
								"$_id",
								"$$countryProvinceIds"
							  ]
							}
						  }
						},
					],
					as: 'countryProvinces',
				}
			}
		]
	).exec()
}

export default getFiftyCitiesOfCountryService
