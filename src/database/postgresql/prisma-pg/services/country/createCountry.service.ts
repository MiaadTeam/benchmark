import Country from "../../repository/country";

const createCountryService = async (countryInput:any) => {
	return await Country.create(countryInput);	
}

export default createCountryService