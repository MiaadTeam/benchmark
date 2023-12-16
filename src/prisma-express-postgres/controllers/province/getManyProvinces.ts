import { Request, Response } from 'express';
import getManyProvincesService from '../../services/province/getManyProvinces.service';

const getManyProvinces = async (req: Request, res: Response) => {
	try {
		const limit = Number(req.params.id)
		const provinces = await getManyProvincesService(limit)
		
		if (provinces) {
            res.status(200).send(provinces);
        }

	}catch(error){
		console.log( "failed to get provinces : "+ error )
	}
}

export default getManyProvinces