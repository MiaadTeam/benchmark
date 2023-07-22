import express from "express";
import { connectToMongoDB } from "../database/mongo/pure";
import seedMongoDB from "../database/mongo/pure/seed";
import errorMiddleware from "../middleware/error.middleware";
import routes from "../routes";

const ServerPort = 9900;

const app = express();
app.use(express.json());
app.use(errorMiddleware)

routes(app);

(async () => {
  process.argv.map(async (val, _index, array) => {
    if (val.includes("--mongo")) {
      await connectToMongoDB();
      
      
      if (array[3] === "--seed") {
        await seedMongoDB()
      }
    }
  })

  app.listen(ServerPort, () => {
    console.log(`Express server is up at http://localhost:${ServerPort}`);
  });
})();