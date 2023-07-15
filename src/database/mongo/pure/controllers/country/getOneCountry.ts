import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import getOneCountryService from '../../services/country/getCountry.service'

const getOneCountry = async (req: Request, res: Response) => {
	try {
		const _id = new ObjectId(req.body.id)
		const country = await getOneCountryService(_id)
		
		if (country) {
            res.status(200).send(country);
        }

	}catch(error){
		console.log( "failed to create country : "+ error.message )
	}
}

export default getOneCountry