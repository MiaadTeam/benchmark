import { Request, Response } from 'express';
import createCityService from '../../services/city/createCity.service';

const createCity = async (req: Request, res: Response) => {
	try{
		const result = await createCityService( req.body)

		result
            ? res.status(201).send(`Successfully created a new City with id ${result.id}`)
            : res.status(500).send("Failed to create a new City.");

	}catch(error){
		console.log( "failed to create City : "+ error )
	}
}

export default createCity