import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import updateCountryService from '../../../../../mongo/pure/services/country/updateCountry.service';
import { ICountryDTO } from '../../../dto/location.dto';

const updateCountry = async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedCountry: ICountryDTO = req.body as ICountryDTO;
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