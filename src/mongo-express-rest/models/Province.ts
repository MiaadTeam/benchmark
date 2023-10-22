import { ObjectId } from "mongodb";

export default class  {
	constructor(
		public name: string,
		public abb: string,
		public population: number,
		public countryId: ObjectId,
		public cities?: ObjectId[],
 		public id?: ObjectId
	) { }
}