import { Request, Response } from 'express';
import getFiftyCitiesOfCountryService from '../../services/country/getFiftyAlleysOfCountry.service';

const getFiftyCitiesOfCountry = async (req: Request, res: Response) => {
	try {
		const result = await getFiftyCitiesOfCountryService()
		
		if (result) {
            res.status(200).send(result);
        }

	}catch(error){
		console.log( "failed to create country : "+ error.message )
	}
}

export default getFiftyCitiesOfCountry