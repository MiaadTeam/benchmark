import { Request, Response } from 'express';
import getOneCountryService from '../../services/country/getOneCountry.service';

const getOneCountry = async (req: Request, res: Response) => {
	try {
		const id = Number(req.params.id)
		console.log('============= id ============ : ', id);
		const country = await getOneCountryService(id)
		
		if (country) {
            res.status(200).send(country);
        }

	}catch(error){
		console.log( "failed to get country : "+ error )
	}
}

export default getOneCountry