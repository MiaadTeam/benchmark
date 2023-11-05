import express from "express";
import { connectToMongoose } from "./index";
import restRoutes from "./routes";
import seedMongoose from "./seed";

try {
  const app = express();
  
  const SERVER_PORT = process.env.SERVER_PORT || 9900;
  
  (async () => {
	await connectToMongoose();
    process.argv.map(async (val:string, _index:unknown) => {
      if (val ==="--seed") {
          await seedMongoose()
      }
	})

	restRoutes(app);
    app.use(express.json());
    
    app.listen(SERVER_PORT, () => {
      console.log(`mongoose-express server is up at http://localhost:${SERVER_PORT}`);
    });
  })();
} catch (error) {
  process.on('SIGINT', () => {
  console.info("exit process ...")
  process.exit(0)
})
  console.log( "bootstrap error :" + error)
}
