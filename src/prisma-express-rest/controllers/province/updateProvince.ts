import { Request, Response } from 'express';
import { IProvinceDTO } from '../../../dto/location.dto';
import updateProvinceService from '../../province/updateProvince.service';

const updateProvince = async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedProvince: IProvinceDTO = req.body ;
        const _id =  Number(id) 
        const result = await updateProvinceService(_id, updatedProvince)

        result
            ? res.status(200).send(`Successfully updated Province with id ${id}`)
            : res.status(304).send(`Province with id: ${id} not updated`);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}

export default updateProvince