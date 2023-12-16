import { Request, Response } from 'express';
import deleteProvinceService from '../../services/province/deleteProvince.service';

const deleteProvince = async (req: Request, res: Response) => {
	try {
		const id = Number(req.params.id) 
		const result = await deleteProvinceService(id)

		if (result) {
			res.status(202).send(`Successfully removed game with id ${id}`);
		} else if (!result) {
			res.status(400).send(`Failed to remove game with id ${id}`);
		} else if (!result) {
			res.status(404).send(`Game with id ${id} does not exist`);
		}
	} catch (error) {
		console.error(error);
		res.status(400).send(error);
	}
}

export default deleteProvince