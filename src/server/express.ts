import express from "express";
import { graphqlHTTP } from "express-graphql";
import "reflect-metadata";
import { schema } from "../api/graphql/root";
import restRoutes from "../api/rest";
import { connectToMongoDB } from "../express-mongo";
import seedMongoDB from "../express-mongo/seed";
import { connectToMongoose } from "../express-mongoose";
import seedMongoose from "../express-mongoose/seed";
import { createPrismaConnection } from "../express-prisma";
import seedPrisma from '../express-prisma/seed';
import { createTypeormConnection } from "../express-typeorm";
import errorMiddleware from "../middleware/error.middleware";
let ENDPOINT = "" // default for RestApi mode

try {
  const app = express();
  
  const SERVER_PORT = process.env.SERVER_PORT || 9900;
  
  (async () => {
    /**
     * array[2] is used for db connection, in both Restful and Graphql modes
     * default is Rest mode
     * and seeding is done via the array[3] argument 
     */
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

      /**
       * after seeding in Rest Mode,
       * server can be reconnected in the Graphql mode via the array[3] argument
       */
      if (array[3] === "--graphql") {
        app.use(
          "/graphql",
          graphqlHTTP({
            schema,
          })
        );
        ENDPOINT = "/graphql"
      } else {
        restRoutes(app);
      }
    })
    
    app.use(express.json());
    app.use(errorMiddleware)
    
    app.listen(SERVER_PORT, () => {
      console.log(`Express server is up at http://localhost:${SERVER_PORT+ENDPOINT}`);
    });
  })();
} catch (error) {
  console.log( "bootstrap error :" + error)
}
