import { Request, Response } from 'express';
import seedMongoDB from '../seed';

const seedController = async (_req: Request, res: Response) => {
	try {
		await seedMongoDB()
		res.status(200).send("seeded MongoDB successfully!");

	}catch(error){
		console.log( "failed to seed the mongo db: "+ error )
	}
}

export default seedController