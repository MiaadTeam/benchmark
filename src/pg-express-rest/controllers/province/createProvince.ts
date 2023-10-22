import { Request, Response } from 'express';
import Province from '../../models/Province';
import createProvinceService from '../../services/province/createProvince.service';

const createProvince = async (req: Request, res: Response) => {
	try{
		const result = await createProvinceService( req.params as Province)

		result
            ? res.status(201).send(`Successfully created a new Province with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new Province.");

	}catch(error){
		console.log( "failed to create Province : "+ error )
	}
}

export default createProvince