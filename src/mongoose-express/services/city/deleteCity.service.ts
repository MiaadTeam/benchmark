import { ObjectId } from "mongodb";
import { City } from "../../models/City";

const deleteCityService = async (id: ObjectId) => {
	return await City.deleteOne(id);
}

export default deleteCityService