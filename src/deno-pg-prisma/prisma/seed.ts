import { readFile } from "fs/promises";
import path from "path";
import { SeedCountry, SeedState } from '../../dataset/dataset.type';
import { ICountryDTO } from "../dto/location.dto";
import createCityService from '../services/city/createCity.service';
import createCountryService from '../services/country/createCountry.service';
import createProvinceService from "../services/province/createProvince.service";

// import { load } from "https://deno.land/std@0.200.0/dotenv/mod.ts";
import { PrismaClient } from "../generated/client";

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
		})
	return  city.id
}

const generateRandom = (min = 0, max = 100)=> {
    const difference = max - min;
    const floor = Math.floor( Math.random() * difference);
    return floor + min;
}

const makeAbb = (name:string) => name.slice(0,3)


export default seedPrisma