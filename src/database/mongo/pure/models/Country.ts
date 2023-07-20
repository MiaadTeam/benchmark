import { ObjectId } from "mongodb";

export default class  {
	constructor(
		public name: string,
		public abb: string,
		public population: number,
		public provinceIds?: ObjectId[],
 		public id?: ObjectId
	) { }
}