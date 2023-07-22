import { readFile } from "fs/promises";
import { Document, InsertOneResult, ObjectId } from "mongodb";
import path from "path";
import { SeedCity, SeedCountry, SeedState } from '../../dataset.type';
import City from "./models/City";
import Country from "./models/Country";
import Province from "./models/Province";
import createCityService from "./services/city/createCity.service";
import createCountryService from "./services/country/createCountry.service";
import createProvinceService from "./services/province/createProvince.service";

const seedMongoDB = async() => {
	console.log("started to seed mongoDB ...");
	
	const dataset = await readDataSet()
	await insertAllCountries(dataset)
	
	console.log("seeded mongoDB");
}
	
const readDataSet = async () => {
	const raw: any = await readFile(
		path.join(__dirname, "../../dataset.json"),
		'utf-8'
	)
	return JSON.parse(raw)
}

const insertAllCountries = async ( seedCountries: SeedCountry[] ) => {
	for await ( const seedCountry of seedCountries ){
		const provinces: Set<InsertOneResult<Document>> = await insertAllProvinces(seedCountry) 
		await insertCountry(seedCountry, provinces)
	}	
}

const insertCountry = async (seedCountry:SeedCountry, provinces: Set<InsertOneResult<Document>>) => {
	const provinceIds: ObjectId[] = []
	for (const province of provinces) {
		provinceIds.push(province.insertedId)
	}
	
	const country:Country = {
		name: seedCountry.name,
		abb: seedCountry.iso2,
		population: generateRandom(100000, 99999999),
		provinceIds
	}
	return await createCountryService(country)
}	

const insertAllProvinces = async (country: SeedCountry) => {
	const provinces:Set<InsertOneResult<Document>> = new Set()
	for await (const state of country.states) {
		const cities = await insertAllCities(state)	
		provinces.add(await insertProvince(state, cities))
	}
	return provinces
}

const insertProvince = async (seedState:SeedState, cities:Set<InsertOneResult<Document>>) => {
	const cityIds: ObjectId[] = []
	for (const city of cities) {
		cityIds.push(city.insertedId)
	}
	
	const province:Province = {
		name: seedState.name,
		abb: seedState.name.slice(3),
		population: generateRandom(10000, 9999999),
		cityIds
	}
	return await createProvinceService(province)
}

const insertAllCities = async (state: SeedState): Promise<Set<InsertOneResult<Document>>> => {
	const cities: Set<InsertOneResult<Document>> = new Set() 
	for await (const city of state.cities) {
		cities.add(await insertCity(city))
	}
	return cities
}

const insertCity = async (seedCity:SeedCity) => {
	const city:City = {
		name: seedCity.name,
		abb: seedCity.name.slice(3),
		population: generateRandom(1000, 99999),
	}
	return await createCityService(city)
}

function generateRandom(min = 0, max = 100) {
    const difference = max - min;
    const floor = Math.floor( Math.random() * difference);
    return floor + min;
}

export default seedMongoDB