import { ObjectId } from "mongodb";
import { collections } from "../..";

const deleteProvinceService = async (id: ObjectId) => {
	return collections.provinces!.deleteOne(id);
}

export default deleteProvinceService