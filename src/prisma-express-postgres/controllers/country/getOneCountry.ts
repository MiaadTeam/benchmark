import { Request, Response } from 'express'
import getOneCountryService from '../../services/country/getOneCountry.service'

const getOneCountry = async (req: Request, res: Response) => {
	try {
		const _id = Number(req.params.id)
		const country = await getOneCountryService(_id)
		
		if (country) {
            res.status(200).send(country);
        }

	}catch(error){
		console.log( "failed to get country : "+ error )
	}
}

export default getOneCountry