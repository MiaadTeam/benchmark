import { ObjectId } from "mongodb";
import { Province } from "../../models/Province";


const getProvinceService = async (_id : ObjectId) => {
	return await Province.findOne(_id);	
}

export default getProvinceService