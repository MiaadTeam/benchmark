import { Request, Response } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import updateCountryService from '../../services/country/updateCountry.service';

const updateCountry = async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedCountry = req.body ;
        const result = await updateCountryService( Number(id), updatedCountry)

        result
            ? res.status(200).send(`Successfully updated Country with id ${id}`)
            : res.status(304).send(`Country with id: ${id} not updated`);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}

export default updateCountry