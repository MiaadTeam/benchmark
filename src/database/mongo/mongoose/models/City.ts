import Joi from 'joi';
import mongoose from 'mongoose';
import { Base } from './Base.type';

export interface ICityDTO {
	name:string ,
	abb: string,
	population: number,
	provinceId: mongoose.Types.ObjectId 	
}

export interface ICity extends Base, ICityDTO, mongoose.Document<String> {}

export const CitySchema = new mongoose.Schema<ICity> ({
	name: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 255,
		trim: true,
	},
	abb:  {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 10,
		trim: true,
	},
	population: Number,
	provinceId: mongoose.Types.ObjectId 
});

export const City = mongoose.model("City", CitySchema)

export function validateCity(input: any): Joi.ValidationResult {
    const schema = Joi.object({
        name: Joi.string().trim().min(2).max(50).required(),
        abb: Joi.string().trim().min(2).max(10).required(),
		language: Joi.number().required(),
		
		provinceId: Joi.object({
			id: Joi.string().hex().length(24)
		}).required(),
    })

    return schema.validate(input)
}