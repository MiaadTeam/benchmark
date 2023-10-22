import { ObjectId } from "mongodb";
import { City } from "../../models/City";


const getCityService = async (_id : ObjectId) => {
	return await City.findOne(_id);	
}

export default getCityService