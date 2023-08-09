import Country from '../../repository/country';

const createCountryService = async (countryInput) => {
	return await Country.create(countryInput);	
}

export default createCountryService