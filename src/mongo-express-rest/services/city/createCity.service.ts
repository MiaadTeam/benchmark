import { collections } from "../..";
import City from "../../models/City";


const createCityService = async (CityInput : City) => {
	return await collections.cities!.insertOne(CityInput);	
}

export default createCityService