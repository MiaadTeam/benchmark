import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { validateGetFiftyCityOfCountry } from '../../models/Country';
import getFiftyCitiesOfCountryService from '../../services/country/getFiftyCitiesOfCountry.service';

const getFiftyCitiesOfCountry = async (req: Request, res: Response) => {
	try {
		const { limit, pageNumber, countryId } = req.body
		validateGetFiftyCityOfCountry({ limit, pageNumber, countryId })
		
		const countryObjectId = countryId ? new mongoose.Types.ObjectId(req.params.id): countryId
		const result = await getFiftyCitiesOfCountryService( countryObjectId, limit, pageNumber )
		
		if (result) {
            res.status(200).send(result);
        }

	}catch(error){
		console.log( "failed to get 50 cities of 50 province of all countries : "+ error )
	}
}

export default getFiftyCitiesOfCountry