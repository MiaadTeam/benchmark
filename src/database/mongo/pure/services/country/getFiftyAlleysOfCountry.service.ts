import { collections } from "../..";

const getFiftyAlleysOfCountryService = async () => {
	return collections.countries?.aggregate(
		[
			{
				$lookup: {
					from: 'countries',
					localField: 'countries.provinceIds',
					foreignField: 'countryId',
					as: 'countryProvinces',
				}
			}
		]
	);
}

export default getFiftyAlleysOfCountryService