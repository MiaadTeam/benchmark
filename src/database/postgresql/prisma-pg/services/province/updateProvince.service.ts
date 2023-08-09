import Province from "../../repository/province";

const updateProvinceService = async ( _id:number, updatedProvince ) => {
	return await Province.update(_id , updatedProvince );
}

export default updateProvinceService