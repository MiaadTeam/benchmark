import { Request, Response } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import getOneProvinceService from '../../services/province/getOneProvince.service';

const getOneProvince = async (req: Request, res: Response) => {
	try {
		const id = Number(req.params.id)
		const Province = await getOneProvinceService(id)
		
		if (Province) {
            res.status(200).send(Province);
        }

	}catch(error){
		console.log( "failed to create Province : "+ error )
	}
}

export default getOneProvince