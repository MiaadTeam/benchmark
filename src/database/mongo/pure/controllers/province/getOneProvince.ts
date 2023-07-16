import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import getOneProvinceService from '../../services/province/getOneProvince.service'

const getOneProvince = async (req: Request, res: Response) => {
	try {
		const _id = new ObjectId(req.body.id)
		const Province = await getOneProvinceService(_id)
		
		if (Province) {
            res.status(200).send(Province);
        }

	}catch(error){
		console.log( "failed to create Province : "+ error.message )
	}
}

export default getOneProvince