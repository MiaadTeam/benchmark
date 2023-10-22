import Joi from 'joi';
import mongoose from 'mongoose';
import { Base } from './Base.type';

export interface ICountryDTO {
	name:string ,
	abb: string,
	population: number,
	provinces: mongoose.Types.ObjectId []	
}

export interface ICountry extends Base, ICountryDTO, mongoose.Document<String> {}

export const CountrySchema:mongoose.Schema<ICountry> = new mongoose.Schema<ICountry>({
	name: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 50,
		trim: true,
	},
	abb:  {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 10,
		trim: true,
	},
	population: Number,
	provinces:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Province'
    }]
});

export const Country:mongoose.Model<ICountry> = mongoose.model("Country", CountrySchema)

const createCountrySchema = Joi.object({
	name: Joi.string().trim().min(2).max(50).required(),
	abb: Joi.string().trim().min(2).max(10).required(),
	population: Joi.number().required(),
	provinces: Joi.array().min(0).items(
		Joi.object({
			id: Joi.string().hex().length(24)
		})
	),
})
export function validateCountry(input: any): Joi.ValidationResult {
    return createCountrySchema.validate(input)
}

const getFiftySchema = Joi.object({
	limit: Joi.number(),
	pageNumber: Joi.number(),
	countryId: Joi.string().hex().length(24)
})
export function validateGetFiftyCityOfCountry(input: any): Joi.ValidationResult {
    return getFiftySchema.validate(input)
}