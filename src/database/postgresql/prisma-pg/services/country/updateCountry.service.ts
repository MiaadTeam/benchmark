import Country from "../../repository/country";

const updateCountryService = async ( _id:number, updatedCountry:any ) => {
	return await Country.update(_id,  updatedCountry );
}

export default updateCountryService