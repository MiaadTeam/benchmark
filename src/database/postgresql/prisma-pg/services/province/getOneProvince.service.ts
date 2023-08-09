import Province from "../../repository/province";


const getProvinceService = async (_id : string) => {
	return await Province.findOne(_id);	
}

export default getProvinceService