import Country from "../../repository/country";

const deleteCountryService = async (id: number) => {
	return await Country.deleteOne(id);
}

export default deleteCountryService