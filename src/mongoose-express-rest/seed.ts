import { readFile } from "fs/promises";
import mongoose from "mongoose";
import path from "path";
import { SeedCity, SeedCountry, SeedState } from '../dataset/dataset.type';
import { ICityDTO } from "./models/City";
import { ICountryDTO } from "./models/Country";
import { IProvinceDTO } from "./models/Province";
import createBulkCityService from "./services/city/createBulkCity.service";
import createCountryService from "./services/country/createCountry.service";
import updateCountryService from "./services/country/updateCountry.service";
import createProvinceService from "./services/province/createProvince.service";
import updateProvinceService from "./services/province/updateProvince.service";

const seedMongoose = async() => {
	console.log("started to seed mongoose ...");
	
	const dataset = await readDataSet()
	await insertAllCountries(dataset)
	
	console.log("seeded mongoose");
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
		const countryId = makeObjectId(country._id)
		const provinces:mongoose.Types.ObjectId[] = await insertAllProvinces(seedCountry, countryId ) 
		await updateCountryService( countryId, {provinces})
	}	
}

const insertCountry = async (seedCountry:SeedCountry) => {
	const country:ICountryDTO = {
		name: seedCountry.name,
		abb: makeAbb(seedCountry.name),
		population: generateRandom(100000, 99999999),
		provinces: []
	}

	return await createCountryService(country)
}	

const insertAllProvinces = async (country: SeedCountry, countryId:mongoose.Types.ObjectId) => {
	const provinces: mongoose.Types.ObjectId[] = []
	for await (const seedState of country.states) {
		const province =  await insertProvince(seedState, countryId) 
		const provinceId = makeObjectId(province._id)
		const cities:mongoose.Types.ObjectId[] = await insertAllCities(seedState,provinceId)	
		await updateProvinceService( provinceId, { cities } )
		provinces.push(provinceId)
	}
	return provinces
}

const insertProvince = async (seedState:SeedState,  countryId: mongoose.Types.ObjectId) => {
	const province:IProvinceDTO = {
		name: seedState.name,
		abb: makeAbb(seedState.name),
		population: generateRandom(10000, 9999999),
		country: countryId,
		cities: []
	}
	return await createProvinceService(province)
}

const insertAllCities = async (state: SeedState, provinceId: mongoose.Types.ObjectId): Promise<Array<mongoose.Types.ObjectId>> => {
	const cityInputs = state.cities.map( seedCity => makeCityDTO(seedCity, provinceId))
	const insertedCities = await createBulkCityService(cityInputs)
	return insertedCities.map(city => makeObjectId(city._id))
}

const makeCityDTO = (seedCity:SeedCity, provinceId: mongoose.Types.ObjectId):ICityDTO => {
	return {
		name: seedCity.name,
		abb: makeAbb(seedCity.name),
		population: generateRandom(1000, 99999),
		province:provinceId,
	}
}

const generateRandom=(min = 0, max = 100)=> {
    const difference = max - min;
    const floor = Math.floor( Math.random() * difference);
    return floor + min;
}

const makeObjectId = (_id: String) => new mongoose.Types.ObjectId( _id as string)
const makeAbb = (name:string) => name.slice(0,3)


export default seedMongoose