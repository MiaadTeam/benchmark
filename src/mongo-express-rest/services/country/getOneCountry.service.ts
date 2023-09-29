import { ObjectId } from "mongodb";
import { collections } from "../..";


const getCountryService = async (_id : ObjectId) => {
	return await collections.countries!.findOne(_id);	
}

export default getCountryService