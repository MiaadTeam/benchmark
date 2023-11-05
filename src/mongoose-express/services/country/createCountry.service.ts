import { Country, ICountryDTO } from "../../models/Country";


const createCountryService = async (countryInput : ICountryDTO) => {
	const country = new Country(countryInput);	
	return country.save()
}

export default createCountryService