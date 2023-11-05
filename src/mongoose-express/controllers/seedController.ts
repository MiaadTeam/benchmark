import { Request, Response } from 'express';
import seedMongoose from '../seed';

const seedController = async (_req: Request, res: Response) => {
	try {
		await seedMongoose()
		res.status(200).send("seeded Mongoose successfully!");

	}catch(error){
		console.log( "failed to seed the mongoose: "+ error )
	}
}

export default seedController