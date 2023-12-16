import { IProvinceDTO, Province } from "../../models/Province";


const createProvinceService = async (provinceInput : IProvinceDTO) => {
	const province = new Province(provinceInput);	
	return await province.save()
}

export default createProvinceService