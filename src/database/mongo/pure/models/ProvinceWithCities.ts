import { ObjectId } from "mongodb";
import City from "./City";

export default class  {
	constructor(
		public name: string,
		public abb: number,
		public population: string,
		public cities?: City[],
 		public id?: ObjectId
	) { }
}