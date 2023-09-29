import { collections } from "../..";
import Country from "../../models/Country";


const createCountryService = async (countryInput : Country) => {
	return await collections.countries!.insertOne(countryInput);	
}

export default createCountryService