import City from "../../repository/city";

const deleteCityService = async (id: number) => {
	return await City.deleteOne(id);
}

export default deleteCityService