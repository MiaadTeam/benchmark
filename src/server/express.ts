import express from "express";
import { initMongo } from "../database/mongo/pure";
// import countryRoutes from "./routes/country.routes";

const ServerPort = 9900;

// Initialize Express
const app = express();

app.use(express.json());
// app.use(dogRoutes);

(async () => {
  process.argv.map(async (val, index, array) => {
    if (val.includes("--mongo")) {
      await initMongo();
    }
  })

  app.listen(ServerPort, () => {
    console.log(`Express server is up at localhost://${ServerPort}`);
  });
})();