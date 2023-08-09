import { ICityDTO } from "../../dto/location.dto"
import City from "../../repository/city"

const createBulkCityService = async (CityInput: ICityDTO[] ) => {
	return await City.createMany(CityInput)	
}

export default createBulkCityService