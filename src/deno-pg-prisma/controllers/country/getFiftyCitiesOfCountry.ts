import { Request, Response } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import getFiftyCitiesOfCountryService from '../../services/country/getFiftyCitiesOfCountry.service';

const getFiftyCitiesOfCountry = async (req: Request, res: Response) => {
	try {
		const { limit, pageNumber, countryId } = req.body
		// validateGetFiftyCityOfCountry({ limit, pageNumber, countryId })
		
		const countryNumberId = countryId ? Number(req.params.id): countryId
		const result = await getFiftyCitiesOfCountryService( countryNumberId, limit, pageNumber )
		
		if (result) {
            res.status(200).send(result);
        }

	}catch(error){
		console.log( "failed to get 50 cities of 50 province of all countries : "+ error )
	}
}

export default getFiftyCitiesOfCountry