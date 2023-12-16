import { Request, Response } from 'express';
import getFiftyCitiesOfCountryService from '../../services/country/getFiftyCitiesOfCountry.service';

const getFiftyCitiesOfCountry = async (req: Request, res: Response) => {
	try {
		const { limit=50, pageNumber=1 } = req.body
		// validateGetFiftyCityOfCountry({ limit, pageNumber, countryId })
		
		const start = Date.now()
		const result = await getFiftyCitiesOfCountryService(limit, pageNumber)
		const end = Date.now()
		console.log("Elapsed time (ms): ",end - start)
		
		if (result) {
            res.status(200).send(result);
        }

	}catch(error){
		console.log( "failed to get 50 cities of 50 province of all countries : "+ error )
	}
}

export default getFiftyCitiesOfCountry