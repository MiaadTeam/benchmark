import { ObjectId } from "mongodb";
import { collections } from "../..";

const deleteCountryService = async (id: ObjectId) => {
	return collections.countries!.deleteOne(id);
}

export default deleteCountryService