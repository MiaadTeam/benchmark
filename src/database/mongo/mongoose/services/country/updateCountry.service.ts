import { ObjectId } from "mongodb";
import { Country, ICountryDTO } from "../../models/Country";


const updateCountryService = async ( _id:ObjectId, updatedCountry : Partial<ICountryDTO> ) => {
	return await Country.updateOne({_id}, { $set: updatedCountry });
}

export default updateCountryService