import { Request, Response } from 'express';
import { IProvinceDTO } from '../../dto/location.dto';
import createProvinceService from '../../services/province/createProvince.service';

const createProvince = async (req: Request, res: Response) => {
	try {
		const createInput = req.body as IProvinceDTO
		const result = await createProvinceService( createInput )

		result
            ? res.status(201).send(`Successfully created a new Province with id ${result.id}`)
            : res.status(500).send("Failed to create a new Province.");

	}catch(error){
		console.log( "failed to create Province : "+ error )
	}
}

export default createProvince