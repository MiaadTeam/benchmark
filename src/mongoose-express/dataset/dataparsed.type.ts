export type SeedCity = {
	"id": number,
	"name": string,
	"population": number,
	"abb": string,
}

export type SeedProvince = {
	"id": number,
	"name": string,
	"population": number,
	"abb": string,
	"cities": [SeedCity]
} 

export type SeedCountry = {
	"id": number;
	"name": string;
	"population": number;
	"abb":string;
	"provinces": [SeedProvince]
}