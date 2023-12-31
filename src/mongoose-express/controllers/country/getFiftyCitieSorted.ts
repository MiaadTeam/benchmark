import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { validateGetFiftyCityOfCountry } from '../../models/Country';
import getFiftyCitiesSortedService from '../../services/country/getFiftyCitiesSorted.service';

const getFiftyCitiesSorted = async (req: Request, res: Response) => {
	try {
		const { limit, pageNumber, countryId } = req.body
		validateGetFiftyCityOfCountry({ limit, pageNumber, countryId })
		
		const countryObjectId = countryId ? new mongoose.Types.ObjectId(req.params.id): countryId

		const start = Date.now()
		const result = await getFiftyCitiesSortedService( countryObjectId, limit, pageNumber )
		const end = Date.now()
		console.log("Elapsed time (ms): ",end - start)

		if (result) {
            res.status(200).send(result);
        }

	}catch(error){
		console.log( "failed to get 50 cities of 50 province of all countries : "+ error )
	}
}

export default getFiftyCitiesSorted