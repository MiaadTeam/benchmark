import Joi from 'joi';
import mongoose from 'mongoose';
import { Base } from './Base.type';

export interface ICountryDTO {
	name:string ,
	abb: string,
	population: number,
	provinceIds: mongoose.Types.ObjectId []	
}

export interface ICountry extends Base, ICountryDTO, mongoose.Document<String> {}

export const CountrySchema = new mongoose.Schema<ICountry>({
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
	provinceIds:[mongoose.Types.ObjectId]
});

export const Country = mongoose.model("Country", CountrySchema)

export function validateCountry(input: any): Joi.ValidationResult {
    const schema = Joi.object({
        name: Joi.string().trim().min(2).max(50).required(),
        abb: Joi.string().trim().min(2).max(10).required(),
        population: Joi.number().required(),
        provinceIds: Joi.array().min(0).items(
			Joi.object({
				id: Joi.string().hex().length(24)
			})
		),
    })

    return schema.validate(input)
}

export function validateGetFiftyCityOfCountry(input: any): Joi.ValidationResult {
    const schema = Joi.object({
        countryId: Joi.object({
				id: Joi.string().hex().length(24)
		}),

		provinceId: Joi.object({
			id: Joi.string().hex().length(24)
		})
    })

    return schema.validate(input)
}