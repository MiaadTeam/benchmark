import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphqlSchema";

try {
	const app = express();
	
	const SERVER_PORT = process.env.SERVER_PORT || 9900;
  
	(async () => {
		  app.use(
			"/graphql",
			graphqlHTTP({
			  schema: schema,
			  graphiql:true
			})
		  );
	  
	  app.use(express.json());	  
	  app.listen(SERVER_PORT, () => {
		console.log(`Express server is up at http://localhost:${SERVER_PORT}/graphql`);
	  });
	})();
	
  } catch (error) {
	console.log( "bootstrap error :" + error)
  }	