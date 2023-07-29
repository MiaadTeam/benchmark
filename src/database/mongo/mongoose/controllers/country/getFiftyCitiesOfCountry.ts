import { Request, Response } from 'express';
import getFiftyCitiesOfCountryService from '../../services/country/getFiftyCitiesOfCountry.service';

const getFiftyCitiesOfCountry = async (_req: Request, res: Response) => {
	try {
		const result = await getFiftyCitiesOfCountryService()
		
		
		if (result) {
            res.status(200).send(result);
        }

	}catch(error){
		console.log( "failed to get 50 cities of 50 province of all countries : "+ error )
	}
}

export default getFiftyCitiesOfCountry