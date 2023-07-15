import { ObjectId } from "mongodb";
import Province from "./Province";

export default class  {
	constructor(
		public name: string,
		public abb: number,
		public population: string,
		public provinceIds?: Province[],
 		public id?: ObjectId
	) { }
}