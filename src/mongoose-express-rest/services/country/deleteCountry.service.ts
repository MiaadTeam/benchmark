import { ObjectId } from "mongodb";
import { Country } from "../../models/Country";

const deleteCountryService = async (id: ObjectId) => {
	return await Country.deleteOne(id);
}

export default deleteCountryService