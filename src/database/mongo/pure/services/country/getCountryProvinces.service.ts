import { ObjectId } from "mongodb";
import { collections } from "../..";


const getCountryProvincesService = async (countryId : ObjectId) => {
	return await collections.provinces!.find({countryId:countryId}).toArray();
}

export default getCountryProvincesService