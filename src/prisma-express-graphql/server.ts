import cors from 'cors';
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { createPrismaConnection } from "./database/connection";
import seedPrisma from './database/seed';
import { schema } from './graphql/root';

try {
  const app = express();
  
  const SERVER_PORT = process.env.SERVER_PORT || 9900;
  
  (async () => {
	await createPrismaConnection();
    process.argv.map(async (val, _index) => {
      if (val ==="--seed") {
          await seedPrisma()
      }
	})

    app.use(
      "/graphql",
      graphqlHTTP({
        schema,
        graphiql:true
      })
    );
    app.use(express.json());
    app.use(cors)
    
    app.listen(SERVER_PORT, () => {
      console.log(`Express server ( prisma + graphql ) is up at http://localhost:${SERVER_PORT}/graphql`);
    });
  })();
} catch (error) {
  console.log( "bootstrap error :" + error)
}
