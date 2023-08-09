import { Request, Response } from 'express'
import getOneProvinceService from '../../province/getOneProvince.service'

const getOneProvince = async (req: Request, res: Response) => {
	try {
		const id = Number(req.params.id)
		const Province = await getOneProvinceService(id)
		
		if (Province) {
            res.status(200).send(Province);
        }

	}catch(error){
		console.log( "failed to create Province : "+ error )
	}
}

export default getOneProvince