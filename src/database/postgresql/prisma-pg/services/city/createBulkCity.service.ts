import City from "../../repository/city";

const createBulkCityService = async ( CityInput:any) => {
	return await City.createMany(CityInput)	
}

export default createBulkCityService