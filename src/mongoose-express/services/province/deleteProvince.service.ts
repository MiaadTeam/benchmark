import { ObjectId } from "mongodb";
import { Province } from "../../models/Province";

const deleteProvinceService = async (id: ObjectId) => {
	return await Province.deleteOne(id);
}

export default deleteProvinceService