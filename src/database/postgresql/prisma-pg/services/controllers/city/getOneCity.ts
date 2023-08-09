import { Request, Response } from 'express'
import getOneCityService from '../../city/getOneCity.service'

const getOneCity = async (req: Request, res: Response) => {
	try {
		const _id = Number(req.params.id)
		const city = await getOneCityService(_id)
		
		if (city) {
            res.status(200).send(city);
        }

	}catch(error){
		console.log( "failed to create City : "+ error )
	}
}

export default getOneCity