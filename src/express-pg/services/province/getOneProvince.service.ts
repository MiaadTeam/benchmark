import { ObjectId } from "mongodb";
import { collections } from "../..";


const getProvinceService = async (_id : ObjectId) => {
	return await collections.provinces!.findOne(_id);	
}

export default getProvinceService