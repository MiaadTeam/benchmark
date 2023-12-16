import { ObjectId } from "mongodb";
import { Country } from "../../models/Country";


const getCountryService = async (_id : ObjectId) => {
	return await Country.findOne(_id);	
}

export default getCountryService