import { ObjectId } from "mongodb";

export default class  {
	constructor(
		public name: string,
		public abb: string,
		public population: number,
		public provinces?: ObjectId[],
 		public id?: ObjectId
	) { }
}