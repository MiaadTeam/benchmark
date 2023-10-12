export type SeedCity = {
	"id": number,
	"name": string,
	"latitude": string,
	"longitude": string
}

export type SeedState = {
	"id": number,
	"name": string,
	"state_code": string,
	"latitude": string,
	"longitude": string ,
	"cities": [ SeedCity ]
} 

export type SeedCountry = {
	"id": number;
	"name": string;
	"iso3": string;
	"iso2": string;
	"phone_code": string;
	"capital": string;
	"currency": string;
	"currency_symbol": string;
	"tld": string;
	"native": string;
	"region": string;
	"subregion": string;
	"translations": Object	
	"timezones": [Object],
	"latitude": string,
	"longitude": string,
	"emoji": string,
	"emojiU":string,
	"states": [SeedState]
}


export const sampleCountry = {
	"id": 239,
	"name": "Venezuela",
	"iso3": "VEN",
	"iso2": "VE",
	"phone_code": "58",
	"capital": "Caracas",
	"currency": "VEF",
	"currency_symbol": "Bs",
	"tld": ".ve",
	"native": "Venezuela",
	"region": "Americas",
	"subregion": "South America",
	"timezones": [
		{
			"zoneName": "America\/Caracas",
			"gmtOffset": -14400,
			"gmtOffsetName": "UTC-04:00",
			"abbreviation": "VET",
			"tzName": "Venezuelan Standard Time"
		}
	],
	"translations": {
		"kr": "베네수엘라",
		"br": "Venezuela",
		"pt": "Venezuela",
		"nl": "Venezuela",
		"hr": "Venezuela",
		"fa": "ونزوئلا",
		"de": "Venezuela",
		"es": "Venezuela",
		"fr": "Venezuela",
		"ja": "ベネズエラ・ボリバル共和国",
		"it": "Venezuela",
		"cn": "委内瑞拉"
	},
	"latitude": "8.00000000",
	"longitude": "-66.00000000",
	"emoji": "🇻🇪",
	"emojiU": "U+1F1FB U+1F1EA",
	"states": [
		{
			"id": 2044,
			"name": "Amazonas",
			"state_code": "Z",
			"latitude": "-3.41684270",
			"longitude": "-65.85606460",
			"cities": [
				{
					"id": 130106,
					"name": "Maroa",
					"latitude": "2.71880000",
					"longitude": "-67.56046000"
				},
			]
		}
	]
		
}