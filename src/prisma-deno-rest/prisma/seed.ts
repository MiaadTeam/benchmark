import { readFile } from "https://deno.land/std@0.110.0/node/fs/promises.ts";
import path from "path";
import { SeedCountry, SeedState } from '../dto/dataset.ts';
import { ICountryDTO } from "../dto/locationDto.ts";
import { PrismaClient } from "../generated/client/index.js";
import * as createCityService from '../services/city/createCityService.ts';
import createCountryService from '../services/country/createCountryService.ts';
import createProvinceService from "../services/province/createProvinceService.ts";

// import { load } from "https://deno.land/std@0.200.0/dotenv/mod.ts";

// const envVars = await load();

// const prisma = new PrismaClient({
//   datasources: {
//     db: {
//       url: envVars.DENO_PRISMA_DB_URL,
//     },
//   },
// });

const prisma = new PrismaClient();

const seedPrisma = async() => {
	console.log("started to seed prisma ...");
	
	const dataset = await readDataSet()
	await insertAllCountries(dataset)
	console.log("seeded prisma sucessfully!");
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
		const country = await insertCountry(seedCountry)
		const countryId = Number(country?.id)
		await insertAllProvinces(seedCountry, countryId ) 
		// await updateCountryService( countryId, {provinces})
	}	
}

const insertCountry = async (seedCountry:SeedCountry) => {
	const country:ICountryDTO = {
		name: seedCountry.name,
		abb: makeAbb(seedCountry.name),
		population: generateRandom(100000, 99999999),
	}
	console.log(country.name)	
	
	return await createCountryService(country, prisma)
}	

const insertAllProvinces = async (country: SeedCountry, countryId:number) => {
	const provinces:number[] = []
	for await (const seedState of country.states) {
		const province =  await insertProvince(seedState, countryId) 
		const provinceId = Number(province?.id)
		await insertAllCities(seedState,provinceId)	
		provinces.push(provinceId)
	}
	return provinces
}

const insertProvince = async (seedState:SeedState,  countryId:number) => {
	const province = {
		name: seedState.name,
		abb: makeAbb(seedState.name),
		population: generateRandom(10000, 9999999),
		countryId,
	}
	return await createProvinceService(province, prisma)
}

const insertAllCities = async (state: SeedState, provinceId:number): Promise<Array<number>> => {
	const insertedCities : any[] = []
	for await (const seedCity of state.cities) {
		const cityId = await insertCity(seedCity, provinceId)
		insertedCities.push(cityId)
	}
	return insertedCities
}

const insertCity = async (seedCity:any,  provinceId:number) => {
	const city = await createCityService({
		name: seedCity.name,
		abb: makeAbb(seedCity.name),
		population: generateRandom(10000, 9999999),
		provinceId,
		}, prisma)
	return  city.id
}

const generateRandom = (min = 0, max = 100)=> {
    const difference = max - min;
    const floor = Math.floor( Math.random() * difference);
    return floor + min;
}

const makeAbb = (name:string) => name.slice(0,3)

export default seedPrisma