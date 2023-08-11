import express from "express";
import "reflect-metadata";
import { connectToMongoose } from "../database/mongo/mongoose";
import seedMongoose from "../database/mongo/mongoose/seed";
import { connectToMongoDB } from "../database/mongo/pure";
import seedMongoDB from "../database/mongo/pure/seed";
import { createPrismaConnection } from "../database/postgresql/prisma-pg";
import seedPrisma from '../database/postgresql/prisma-pg/seed';
import { createTypeormConnection } from "../database/postgresql/typeorm";
import errorMiddleware from "../middleware/error.middleware";
import routes from "../routes";

const ServerPort = process.env.SERVER_PORT || 9900;
try {
  (async () => {
    process.argv.map(async (val, _index, array) => {
      if (val ==="--mongoose") {
        await connectToMongoose();
        if (array[3] === "--seed") {
          await seedMongoose()
        }
        
      } else if (val ==="--mongo") {
        await connectToMongoDB();
        if (array[3] === "--seed") {
          await seedMongoDB()
        }
      } else if (val ==="--typeorm") {
          createTypeormConnection();
        if (array[3] === "--seed") {
          // await seedTypeOrm()
        }
      } else if (val ==="--prisma") {
          await createPrismaConnection();
        if (array[3] === "--seed") {
          await seedPrisma()
        }
      }
    })
  
    const app = express();
    app.use(express.json());
    app.use(errorMiddleware)
    routes(app);
    
    app.listen(ServerPort, () => {
      console.log(`Express server is up at http://localhost:${ServerPort}`);
    });
  })();
} catch (error) {
  console.log( "bootstrap error :" + error)
}
