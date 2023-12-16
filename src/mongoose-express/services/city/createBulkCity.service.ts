import { City, ICityDTO } from "../../models/City";

const createBulkCityService = async (CityInput : ICityDTO[]) => {
	return await City.insertMany(CityInput)	
}

export default createBulkCityService