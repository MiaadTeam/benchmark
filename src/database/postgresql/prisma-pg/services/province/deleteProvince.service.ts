import Province from "../../repository/province";

const deleteProvinceService = async (id: string) => {
	return await Province.deleteOne(id);
}

export default deleteProvinceService