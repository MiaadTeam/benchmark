import { Request, Response } from 'express';
import { ICountryDTO, validateCountry } from '../../models/Country';
import createCountryService from '../../services/country/createCountry.service';

const createCountry = async (req: Request, res: Response) => {
	try {
		const countryInput  =  req.body as ICountryDTO
		validateCountry(countryInput)
		const result = await createCountryService( countryInput )

		result
            ? res.status(201).send(`Successfully created a new country with id ${result._id}`)
            : res.status(500).send("Failed to create a new country.");

	}catch(error: any){
		console.log( "failed to create country : "+ error )
	}
}

export default createCountry