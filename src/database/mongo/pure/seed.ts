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
	const queries :any= []
	
	dataset.map(
		async (seedCountry:SeedCountry )=> {
			const country = await insertCountry(seedCountry)
			queries.push(country)

			seedCountry.states.map(async (state: SeedState) => {
				const provinceQuery = await insertProvince(state)
				queries.push(provinceQuery)
				
				state.cities.map(async (seedCity: SeedCity) => {
					const cityQuery = await insertCity( seedCity)
					queries.push(cityQuery)
				})
			})
		}
	)
	Promise.all(queries)

	

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

const insertCountry = async (seedCountry:SeedCountry) => {
	const country:Country = {
		name: seedCountry.name,
		abb: seedCountry.iso2,
		population: generateRandom(100000, 99999999),
		provinceIds:[]
	}
	return await createCountryService(country)
}	

const insertProvince = async (seedState:SeedState) => {
	const province:Province = {
		name: seedState.name,
		abb: seedState.name.slice(3),
		population: generateRandom(10000, 9999999),
		cityIds:[]
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