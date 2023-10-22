import { collections } from "../..";

const getFiftyCitiesOfCountryService = async () => {
	return collections.countries?.aggregate(
		[
			{
				$lookup: {
				from: "provinces",
				localField: "_id",
				foreignField: "countryId",
				as: "provinces"
				}
			}, {
				$lookup: {
					from: "",
					localField: "address._id",
					foreignField: "address_id",
					as: "address.addressComment",
				}
			}, {
				$group: {
					_id : "$_id",
					name: { $first: "$name" },
					address: { $push: "$address" }
				}
			}, {
				$project: {
					_id: 1,
					name: 1,
					address: {
						$filter: { input: "$address", as: "a", cond: { $ifNull: ["$$a._id", false] } }
					}
				}
			}
		]
	).toArray()
}

export default getFiftyCitiesOfCountryService
