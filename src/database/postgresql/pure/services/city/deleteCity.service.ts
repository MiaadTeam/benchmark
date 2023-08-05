import { ObjectId } from "mongodb";
import { collections } from "../..";

const deleteCityService = async (id: ObjectId) => {
	return collections.cities!.deleteOne(id);
}

export default deleteCityService