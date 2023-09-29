import express from "express";
import errorMiddleware from "../middleware/error.middleware";
import { createPrismaConnection } from "./prisma/connection";
import seedPrisma from './prisma/seed';
import restRoutes from "./routes";

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

	restRoutes(app);
    app.use(express.json());
    app.use(errorMiddleware)
    
    app.listen(SERVER_PORT, () => {
      console.log(`Express server ( prisma + rest ) is up at http://localhost:${SERVER_PORT}`);
    });
  })();
} catch (error) {
  console.log( "bootstrap error :" + error)
}
