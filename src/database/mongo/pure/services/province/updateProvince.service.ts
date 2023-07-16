import { ObjectId } from "mongodb";
import { collections } from "../..";
import Province from "../../models/Province";


const updateProvinceService = async ( _id:ObjectId, updatedProvince : Partial<Province> ) => {
	return await collections.provinces!.updateOne(_id, { $set: updatedProvince });
}

export default updateProvinceService