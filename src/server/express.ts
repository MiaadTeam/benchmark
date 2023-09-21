import express from "express";
import { graphqlHTTP } from "express-graphql";
import "reflect-metadata";
import { root, schema } from "../api/graphql/root";
import restRoutes from "../api/rest";
import { createPrismaConnection } from "../epxress-pg-prisma";
import seedPrisma from '../epxress-pg-prisma/seed';
import { connectToMongoDB } from "../express-mongo";
import seedMongoDB from "../express-mongo/seed";
import { connectToMongoose } from "../express-mongoose";
import seedMongoose from "../express-mongoose/seed";
import { createTypeormConnection } from "../express-pg-typeorm";
import errorMiddleware from "../middleware/error.middleware";

const SERVER_PORT = process.env.SERVER_PORT || 9900;
let ENDPOINT = ""

try {
  const app = express();
  
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

      if (array[3] === "--graphql") {
        app.use(
          "/graphql",
          graphqlHTTP({
            schema: schema,
            rootValue: root,
            graphiql:true
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
