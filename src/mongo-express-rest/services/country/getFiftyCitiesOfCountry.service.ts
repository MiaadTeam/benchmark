import { collections } from "../..";

const getFiftyCitiesOfCountryService = async () => {
	return collections.countries?.aggregate(
		[
			{ $skip: 0 },
			{ $limit: 50 },
			{
				$lookup: {
					from: "provinces",
					// localField: "provinces",
					// foreignField: "_id",
					let: { "provincesIds": "$provinces" },
					pipeline: [
						{
							$match: {
								$expr: { $in: ["$_id", "$$provincesIds"] }
							}
						},
						{
							$lookup: {
								from: "cities",
								let: { "cityIds": "$cities" },
								pipeline: [
									{
										$match: {
											$expr: { $in: ["$_id", "$$cityIds"] }
										}
									}
								],
								as: "cities"
							},
						}
					],
					as: "provinces"
				}
			},
			// {
			// 	$lookup: {
			// 		from: "cities",
			// 		localField: "provinces.cities",
			// 		foreignField: "_id",
			// 		as: "anotherCities"
			// 	}
			// },
			// {
			// 	$project: {
			// 		_id: 1,
			// 		name: 1,
			// 		provinces: {
			// 			_id: 1,
			// 			name: 1,
			// 			cities: 1
			// 		}
			// 	}
			// }
		]
	).toArray()
}

export default getFiftyCitiesOfCountryService
