import { ObjectId } from "mongodb";
import { IProvinceDTO, Province } from "../../models/Province";


const updateProvinceService = async ( _id:ObjectId, updatedProvince : Partial<IProvinceDTO> ) => {
	return await Province.updateOne({ _id }, { $set: updatedProvince });
}

export default updateProvinceService