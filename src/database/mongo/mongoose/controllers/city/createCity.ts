import { Request, Response } from 'express';
import { ICityDTO } from '../../models/City';
import createCityService from '../../services/city/createCity.service';

const createCity = async (req: Request, res: Response) => {
	try{
		const result = await createCityService( req.body as ICityDTO)

		result
            ? res.status(201).send(`Successfully created a new City with id ${result._id}`)
            : res.status(500).send("Failed to create a new City.");

	}catch(error){
		console.log( "failed to create City : "+ error )
	}
}

export default createCity