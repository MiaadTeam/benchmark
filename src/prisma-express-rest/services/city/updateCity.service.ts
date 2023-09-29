import { ICityDTO } from "../../dto/location.dto";
import City from "../../repository/city";

const updateCityService = async ( _id:number, updatedCity : Partial<ICityDTO> ) => {
	return await City.update(_id, updatedCity);
}

export default updateCityService