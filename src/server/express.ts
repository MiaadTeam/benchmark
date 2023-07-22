import express from "express";
import { connectToMongoDB } from "../database/mongo/pure";
import seedMongoDB from "../database/mongo/pure/seed";

const ServerPort = 9900;

const app = express();
app.use(express.json());

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
    console.log(`Express server is up at localhost://${ServerPort}`);
  });
})();