import Country from "../../repository/country";

const getCountryService = async (_id : number) => {
	return await Country.findOne(_id);	
}

export default getCountryService