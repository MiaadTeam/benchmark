import { ICityDTO } from "../../dto/location.dto";
import City from "../../repository/city";


const createCityService = async (CityInput : ICityDTO) => {
	return await City.create(CityInput);	
}

export default createCityService