import Province from "../../repository/province";

const updateProvinceService = async ( _id:string, updatedProvince ) => {
	return await Province.update(_id , updatedProvince );
}

export default updateProvinceService