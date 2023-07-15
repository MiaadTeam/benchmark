import * as mongoDB from "mongodb";
import { ConnectOptions } from "mongodb";

export const collections: {
	countries?: mongoDB.Collection

} = {}

export async function connectToMongoDB () {
 
	const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string,
		{ useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions
	);
			
	await client.connect();
		 
	const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
	const countriesCollection: mongoDB.Collection = db.collection(process.env.COUNTRY_COLLECTION_NAME as string);
 
    collections.countries = countriesCollection;
	   
	console.log(`Successfully connected to database: ${db.databaseName} and collection: ${countriesCollection.collectionName}`);
 }