import { readFile } from "fs/promises";
import { Document, InsertOneResult, ObjectId } from "mongodb";
import path from "path";
import { SeedCity, SeedCountry, SeedProvince } from '../dataset/dataparsed.type';
import City from "./models/City";
import Country from "./models/Country";
import Province from "./models/Province";
import createCityService from "./services/city/createCity.service";
import createCountryService from "./services/country/createCountry.service";
import updateCountryService from "./services/country/updateCountry.service";
import createProvinceService from "./services/province/createProvince.service";
import updateProvinceService from "./services/province/updateProvince.service";

const seedMongoDB = async() => {
	console.log("started to seed mongoDB ...");
	
	const dataset = await readDataSet()
	await insertAllCountries(dataset)
	
	console.log("seeded mongoDB");
}
	
const readDataSet = async () => {
	const raw: any = await readFile(
		path.join(__dirname, "../dataset/dataparsed.json"),
		'utf-8'
	)
	return JSON.parse(raw)
}

const insertAllCountries = async ( seedCountries: SeedCountry[] ) => {
	for await ( const seedCountry of seedCountries ){
		const country = await insertCountry(seedCountry)
		const provinces: Set<InsertOneResult<Document>> = await insertAllProvinces(seedCountry, country.insertedId) 
		await updateCountryWithProvinceIds(country.insertedId, provinces)
	}	
}

const insertCountry = async (seedCountry:SeedCountry) => {
	const country:Country = {
		name: seedCountry.name,
		abb: seedCountry.abb,
		population: seedCountry.population,
		provinces: []
	}

	return await createCountryService(country)
}	

const updateCountryWithProvinceIds = async (countryId: ObjectId, seedProvince: Set<InsertOneResult<Document>>) => {
	const provinces: ObjectId[] = []
	for (const province of seedProvince) {
		provinces.push(province.insertedId)
	}	
	await updateCountryService(countryId, {provinces})
}

const insertAllProvinces = async (country: SeedCountry, countryId:ObjectId) => {
	const provinces:Set<InsertOneResult<Document>> = new Set()
	for await (const seedState of country.provinces) {
		const province =  await insertProvince(seedState, countryId) 
		const cities = await insertAllCities(seedState,province.insertedId)	
		await updateProvinceWithCities(province.insertedId, cities)
		provinces.add( province)
	}
	return provinces
}

const insertProvince = async (seedProvince:SeedProvince, countryId: ObjectId) => {
	const province:Province = {
		name: seedProvince.name,
		abb: seedProvince.abb,
		population: seedProvince.population,
		countryId,
		cities: []
	}
	return await createProvinceService(province)
}

const updateProvinceWithCities = async (provinceId: ObjectId, seedCities: Set<InsertOneResult<Document>>) => {
	const cities: ObjectId[] = []
	for (const city of seedCities) {
		cities.push(city.insertedId)
	}

	await updateProvinceService( provinceId, {cities} )
}

const insertAllCities = async (state: SeedProvince, provinceId: ObjectId): Promise<Set<InsertOneResult<Document>>> => {
	const cities: Set<InsertOneResult<Document>> = new Set() 
	for await (const seedCity of state.cities) {
		const city = await insertCity(seedCity, provinceId)
		cities.add(city)
	}
	return cities
}

const insertCity = async (seedCity:SeedCity, provinceId: ObjectId) => {
	const city:City = {
		name: seedCity.name,
		abb: seedCity.abb,
		population: seedCity.population,
		provinceId
	}
	return await createCityService(city)
}

export default seedMongoDB