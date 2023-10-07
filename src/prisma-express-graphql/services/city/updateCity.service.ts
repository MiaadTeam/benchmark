import { ICityDTO } from "../../dto/location.dto";

const updateCityService = async ( _id:number, updatedCity : Partial<ICityDTO> ) => {
	return await .update(_id, updatedCity);
}

export default updateCityService