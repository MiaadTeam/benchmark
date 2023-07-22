import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import City from '../../models/City';
import updateCityService from '../../services/city/updateCity.service';

const updateCity = async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedCity: City = req.body as City;
        const _id =  new ObjectId(id) 
        const result = await updateCityService(_id, updatedCity)

        result
            ? res.status(200).send(`Successfully updated City with id ${id}`)
            : res.status(304).send(`City with id: ${id} not updated`);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}

export default updateCity