import { Request, Response } from 'express';
import getOneProvinceService from '../../services/province/getOneProvince.service';

const getOneProvince = async (req: Request, res: Response) => {
	try {
		const id = Number(req.params.id)
		const province = await getOneProvinceService(id)
		
		if (province) {
            res.status(200).send(province);
        }

	}catch(error){
		console.log( "failed to get Province : "+ error )
	}
}

export default getOneProvince