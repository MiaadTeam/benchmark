import { Request, Response } from 'express'
import getManyCountriesService from '../../services/country/getManyCountries.service'

const getManyCountry = async (req: Request, res: Response) => {
	try {
		const limit = Number(req.params.id)
		const countries = await getManyCountriesService(limit)
		
		if (countries) {
            res.status(200).send(countries);
        }

	}catch(error){
		console.log( "failed to get countries : "+ error )
	}
}

export default getManyCountry