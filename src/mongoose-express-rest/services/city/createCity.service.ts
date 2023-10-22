import { City, ICityDTO } from "../../models/City";


const createCityService = async (CityInput : ICityDTO) => {
	const city  = new City(CityInput);	
	return city.save()
}

export default createCityService