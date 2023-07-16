import { ObjectId } from "mongodb";
import { collections } from "../..";


const getCityService = async (_id : ObjectId) => {
	return await collections.cities!.findOne(_id);	
}

export default getCityService