import { collections } from "../..";

const getFiftyCitiesOfCountryService = async () => {
	return collections.countries?.aggregate(
		[
			{
				$lookup: {
					from: 'provinces',
					localField: '_id',
					foreignField: 'countryId',
					as: 'countryProvinces',
				}
			}
		]
	);
}

export default getFiftyCitiesOfCountryService
