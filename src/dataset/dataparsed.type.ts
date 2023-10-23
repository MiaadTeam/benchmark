type Location = {
	"id": number,
	"name": string,
	"population": number,
	"abb": string,
}

export interface SeedCity extends Location{}

export interface SeedProvince extends Location {
	"cities": [SeedCity]
} 

export interface SeedCountry extends Location {
	"provinces": [SeedProvince]
}