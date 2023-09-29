import { Request, Response } from 'express'
import Country from '../../models/Country'
import createCountryService from '../../services/country/createCountry.service'

const createCountry = async (req: Request, res: Response) => {
	try{
		const result = await createCountryService( req.body as Country)

		result
            ? res.status(201).send(`Successfully created a new country with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new country.");

	}catch(error: any){
		console.log( "failed to create country : "+ error )
	}
}

export default createCountry