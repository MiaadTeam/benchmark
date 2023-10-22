import * as mongoDB from "mongodb";

export const collections: {
	countries?: mongoDB.Collection
	provinces?: mongoDB.Collection
	cities?: mongoDB.Collection
} = {}

export async function connectToMongoDB () {
 
const port = process.env.MONGO_PORT
const dbName = process.env.MONGO_NAME

const mongoConnectionString =
    `mongodb://localhost:${port}/${dbName}?maxPoolSize=2-&w=majority`
	const client: mongoDB.MongoClient = new mongoDB.MongoClient( mongoConnectionString);
			
	await client.connect();
		 
	const db: mongoDB.Db = client.db(process.env.DB_NAME);
	console.log(`Successfully connected to mongoDB database: ${db.databaseName}`)

	const countriesCollection: mongoDB.Collection = db.collection(process.env.COUNTRY_COLLECTION_NAME as string);
    collections.countries = countriesCollection;
	   
	const provincesCollection: mongoDB.Collection = db.collection(process.env.PROVINCE_COLLECTION_NAME as string); collections.countries = countriesCollection;
	collections.provinces = provincesCollection;

	const citiesCollection: mongoDB.Collection = db.collection(process.env.CITY_COLLECTION_NAME as string); collections.countries = countriesCollection;
	collections.cities = citiesCollection
	console.log(`Connected to collections`);
}