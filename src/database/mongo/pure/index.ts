import * as mongoDB from "mongodb";

export const collections: {
	countries?: mongoDB.Collection
	provinces?: mongoDB.Collection
	cities?: mongoDB.Collection
} = {}

export async function connectToMongoDB () {
 
	const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string,
		{ useNewUrlParser: true, useUnifiedTopology: true } as mongoDB.ConnectOptions
	);
			
	await client.connect();
		 
	const db: mongoDB.Db = client.db(process.env.DB_NAME);
	console.log(`Successfully connected express server to mongoDB database: ${db.databaseName}`)

	const countriesCollection: mongoDB.Collection = db.collection(process.env.COUNTRY_COLLECTION_NAME as string);
    collections.countries = countriesCollection;
	console.log(`Connected to collection: ${countriesCollection.collectionName}`);
	   
	const provincesCollection: mongoDB.Collection = db.collection(process.env.PROVINCE_COLLECTION_NAME as string); collections.countries = countriesCollection;
	collections.provinces = provincesCollection;
	console.log(`Connected to collection: ${provincesCollection.collectionName}`);

	const citiesCollection: mongoDB.Collection = db.collection(process.env.CITY_COLLECTION_NAME as string); collections.countries = countriesCollection;
	collections.cities = citiesCollection
	console.log(`Connected to collection: ${citiesCollection.collectionName}`);
}