import { Request, Response } from 'express'
import getManyCitiesService from '../../services/city/getManyCities.service'

const getManyCities = async (req: Request, res: Response) => {
	try {
		const _id = Number(req.params.id)
		const limit = Number(req.params.id)
		const city = await getManyCitiesService(_id, limit)
		
		if (city) {
            res.status(200).send(city);
        }

	}catch(error){
		console.log( "failed to get cities : "+ error )
	}
}

export default getManyCities