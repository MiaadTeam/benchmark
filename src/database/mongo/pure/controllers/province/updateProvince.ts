import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import Province from '../../models/Province';
import updateProvinceService from '../../services/province/updateProvince.service';

const updateProvince = async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedProvince: Province = req.body as Province;
        const _id =  new ObjectId(id) 
        const result = await updateProvinceService(_id, updatedProvince)

        result
            ? res.status(200).send(`Successfully updated Province with id ${id}`)
            : res.status(304).send(`Province with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}

export default updateProvince