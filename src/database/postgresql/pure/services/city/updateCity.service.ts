import { ObjectId } from "mongodb";
import { collections } from "../..";
import City from "../../models/City";


const updateCityService = async ( _id:ObjectId, updatedCity : Partial<City> ) => {
	return await collections.cities!.updateOne({ _id }, { $set: updatedCity });
}

export default updateCityService