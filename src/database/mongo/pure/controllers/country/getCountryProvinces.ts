import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import getCountryProvincesService from '../../services/country/getCountryProvinces.service';

const getCountryProvinces = async(req: Request, res: Response) => {
	try {
		const _id = new ObjectId(req.params.id)

		console.log('============= _id ============ : ', _id);
		const result = await getCountryProvincesService(_id)
		// console.log('============= result ============ : ', result);
		
			res.status(200).send(result);

	}catch(error){
		console.log( "failed to get country provinces : "+ error )
	}
}

export default getCountryProvinces