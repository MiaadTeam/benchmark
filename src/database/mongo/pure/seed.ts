import { readFile } from "fs/promises";
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
	
	const countryInserts = dataset.map(
		async (seedCountry: SeedCountry) => {
			const provinceInserts:any = seedCountry.states.map(async (state: SeedState) => {
				const cityInserts = state.cities.map(async (seedCity: SeedCity) =>
					insertCity(seedCity)
				)
				const cities = await Promise.all(cityInserts)
				return insertProvince(state, cities as unknown as City[])
				})
				const provinces = await Promise.all(provinceInserts)
				return await insertCountry(seedCountry, provinces as unknown as Province[])
		})
	Promise.all(countryInserts)

	
	console.log("seeded mongoDB");
	
}

const readDataSet = async () => {
	const raw: any = await readFile(
		path.join(__dirname, "../../dataset.json"),
		'utf-8'
	)
	return JSON.parse(raw)
}

function generateRandom(min = 0, max = 100) {
    const difference = max - min;
    const floor = Math.floor( Math.random() * difference);
    return floor + min;
}

const insertCountry = async (seedCountry:SeedCountry, provinces: Province[]) => {
	const country:Country = {
		name: seedCountry.name,
		abb: seedCountry.iso2,
		population: generateRandom(100000, 99999999),
		provinceIds: provinces.map( province => province.id!)
	}
	return await createCountryService(country)
}	

const insertProvince = async (seedState:SeedState, cities:City[]) => {
	const province:Province = {
		name: seedState.name,
		abb: seedState.name.slice(3),
		population: generateRandom(10000, 9999999),
		cityIds: cities.map(city => city.id!)
	}
	return await createProvinceService(province)
}

const insertCity = async (seedCity:SeedCity) => {
	const city:City = {
		name: seedCity.name,
		abb: seedCity.name.slice(3),
		population: generateRandom(1000, 99999),
	}
	return await createCityService(city)
}

export default seedMongoDB