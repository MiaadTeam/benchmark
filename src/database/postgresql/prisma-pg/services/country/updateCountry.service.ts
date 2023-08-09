import Country from "../../repository/country";

const updateCountryService = async ( _id:number, updatedCountry ) => {
	return await Country.update(_id,  updatedCountry );
}

export default updateCountryService