
import { Request, Response } from 'express';
import deleteCountryService from '../../services/country/deleteCountry.service';

const deleteCountry = async (req: Request, res: Response) => {
	try {
		const _id = Number(req.params.id) 
		const result = await deleteCountryService(_id)

		if (result && result) {
			res.status(202).send(`Successfully removed game with id ${_id}`);
		} else if (!result) {
			res.status(400).send(`Failed to remove game with id ${_id}`);
		} else if (!result) {
			res.status(404).send(`Game with id ${_id} does not exist`);
		}
	} catch (error) {
		console.error(error);
		res.status(400).send(error);
	}
}

export default deleteCountry