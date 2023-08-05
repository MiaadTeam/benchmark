import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import Country from '../../models/Country';
import updateCountryService from '../../services/country/updateCountry.service';

const updateCountry = async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedCountry: Country = req.body as Country;
        const _id =  new ObjectId(id) 
        const result = await updateCountryService(_id, updatedCountry)

        result
            ? res.status(200).send(`Successfully updated Country with id ${id}`)
            : res.status(304).send(`Country with id: ${id} not updated`);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}

export default updateCountry