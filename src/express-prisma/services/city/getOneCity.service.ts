import City from '../../repository/city';

const getCityService = async (_id : number) => {
	return await City.findOne(_id);	
}

export default getCityService