import Joi from 'joi';
import mongoose from 'mongoose';
import { Base } from './Base.type';

export interface IProvinceDTO {
	name:string ,
	abb: string,
	population: number,
	countryId: mongoose.Types.ObjectId 	
	cityIds: mongoose.Types.ObjectId []	
}

export interface IProvince extends Base, IProvinceDTO, mongoose.Document<String> {}

export const ProvinceSchema = new mongoose.Schema<IProvince>({
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
	countryId: mongoose.Types.ObjectId,
	cityIds: [mongoose.Types.ObjectId]
});

export const Province = mongoose.model("Province", ProvinceSchema)

export function validateProvince(input: any): Joi.ValidationResult {
    const schema = Joi.object({
        name: Joi.string().trim().min(2).max(50).required(),
        abb: Joi.string().trim().min(2).max(10).required(),
		language: Joi.number().required(),
		
		provinceId: Joi.object({
			id: Joi.string().hex().length(24)
		}).required(),
		
		cityIds: Joi.array().min(0).items(
			Joi.object({
				id: Joi.string().hex().length(24)
			})
		),
    })

    return schema.validate(input)
}
export default ProvinceSchema