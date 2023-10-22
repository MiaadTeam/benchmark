import Joi from 'joi';
import mongoose from 'mongoose';
import { Base } from './Base.type';
import { Province } from './Province';

export interface ICityDTO {
	name:string ,
	abb: string,
	population: number,
	province: mongoose.Types.ObjectId	
}

export interface ICity extends Base, ICityDTO, mongoose.Document<String> {}

export const CitySchema: mongoose.Schema<ICity> = new mongoose.Schema<ICity> ({
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
	province: {
		type: mongoose.Schema.Types.ObjectId,
		ref: Province
	} 
});

export const City: mongoose.Model<ICity> = mongoose.model("City", CitySchema)

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