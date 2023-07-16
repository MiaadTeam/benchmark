import { Request, Response } from 'express';
import getFiftyAlleysOfCountryService from '../../services/country/getFiftyAlleysOfCountry.service';

const getFiftyAlleysOfCountry = async (req: Request, res: Response) => {
	try {
		const result = await getFiftyAlleysOfCountryService()
		
		if (result) {
            res.status(200).send(result);
        }

	}catch(error){
		console.log( "failed to create country : "+ error.message )
	}
}
// 50 Country
// 50 Province
// 50 city
// 50 alley

export default getFiftyAlleysOfCountry