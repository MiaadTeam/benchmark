import { Request, Response } from 'express';
import seedPrisma from '../database/seed';

const seedController = async (_req: Request, res: Response) => {
	try {
		console.log("started to seed ...");
		await seedPrisma()
		res.status(200).send("seeded successfully!");

	}catch(error){
		console.log( "failed to seed the prisma db: "+ error )
	}
}

export default seedController