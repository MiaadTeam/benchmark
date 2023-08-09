// same in all locations
export interface ILocationDTO {
	name:string ,
	abb: string,
	population: number,	
}

export interface ICountryDTO extends ILocationDTO{
	provinces?: number[]	
}

export interface IProvinceDTO extends ILocationDTO{
	country:number
	cities?: number[]	
}

export interface ICityDTO extends ILocationDTO{
	province:number
}