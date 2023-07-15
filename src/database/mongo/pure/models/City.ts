import { ObjectId } from "mongodb";

export default class  {
	constructor(
		public name: string,
		public abb: number,
		public population: string,
 		public id?: ObjectId
	) { }
}