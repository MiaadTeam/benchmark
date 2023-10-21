import { readFile } from "fs/promises";
import path from "path";
import { SeedCity, SeedCountry, SeedProvince } from '../../dataset/dataparsed.type';
import { ICountryDTO } from "../dto/location.dto";
import createCityService from '../services/city/createCity.service';
import createCountryService from '../services/country/createCountry.service';
import createProvinceService from "../services/province/createProvince.service";

const seedPrisma = async() => {
	console.log("started to seed prisma ...");

	const dataset = await readDataSet()
	await insertAllCountries(dataset)
	console.log("seeded prisma sucessfully!");
}
	
const readDataSet = async () => {
	const raw: any = await readFile(
		path.join(__dirname, "../../dataset/dataparsed.json"),
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
		abb: seedCountry.abb,
		population: seedCountry.population,
	}
	console.log(country.name)	
	
	return await createCountryService(country)
}	

const insertAllProvinces = async (country: SeedCountry, countryId:number) => {
	const provinces:number[] = []
	for await (const seedProvince of country.provinces) {
		const province =  await insertProvince(seedProvince, countryId) 
		const provinceId = Number(province?.id)
		await insertAllCities(seedProvince,provinceId)	
		provinces.push(provinceId)
	}
	return provinces
}

const insertProvince = async (seedProvince:SeedProvince,  countryId:number) => {
	const province = {
		name: seedProvince.name,
		abb:seedProvince.abb,
		population: seedProvince.population,
		countryId,
	}
	return await createProvinceService(province)
}

const insertAllCities = async (state: SeedProvince, provinceId:number): Promise<Array<number>> => {
	const insertedCities : any[] = []
	for await (const seedCity of state.cities) {
		const cityId = await insertCity(seedCity, provinceId)
		insertedCities.push(cityId)
	}
	return insertedCities
}

const insertCity = async (seedCity:SeedCity,  provinceId:number) => {
	const city = await createCityService({
		name: seedCity.name,
		abb: seedCity.abb,
		population: seedCity.population,
		provinceId,
		})
	return  city.id
}

export default seedPrisma