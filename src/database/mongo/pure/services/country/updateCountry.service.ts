import { ObjectId } from "mongodb";
import { collections } from "../..";
import Country from "../../models/Country";


const updateCountryService = async ( _id:ObjectId, updatedCountry : Partial<Country> ) => {
	return await collections.countries!.updateOne(_id, { $set: updatedCountry });
}

export default updateCountryService