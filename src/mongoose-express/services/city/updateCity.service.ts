import { ObjectId } from "mongodb";
import { City, ICityDTO } from "../../models/City";


const updateCityService = async ( _id:ObjectId, updatedCity : Partial<ICityDTO> ) => {
	return await City.updateOne({ _id }, { $set: updatedCity });
}

export default updateCityService