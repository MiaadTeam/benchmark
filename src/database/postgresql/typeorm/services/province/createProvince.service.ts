import { collections } from "../..";
import Province from "../../models/Province";


const createProvinceService = async (provinceInput : Province) => {
	return await collections.provinces!.insertOne(provinceInput);	
}

export default createProvinceService