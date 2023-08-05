import { Country } from "../../models/Country";


const createCountryService = async (countryInput : Country) => {
	const country = Country.create(countryInput);	
	return await country.save()
}

export default createCountryService