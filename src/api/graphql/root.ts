import getFiftyCitiesNoSortService from '../../express-mongoose/services/country/getFiftyCitiesNoSort.service';
var { buildSchema } = require("graphql")

// Construct a schema, using GraphQL schema language
// type mongooseCities = Promise<Omit<mongoose.Document<unknown, {}, ICountry> & ICountry & Required<{
//   _id: String;
// }>, never>[]>
 
// graphql models
export const schema =buildSchema( `
    type Country{
        id: Int
        name: String
        abb: String
        population:Int
        provinces:[Province]
    }
    
    type Province{
        id:Int      
        name:String     
        abb:String
        population:Int
        cities:[City]
        country:Country  
        countryId:Int
    }

    type City {
        id:Int        
        name:String     
        abb:String
        population:Int
        province:Province 
        provinceId:Int
    }
    
    type Query{
        getFiftyCities: [Country]  
    }
`);

// Graphql Resolvers
export const root = {
  Query: {
    getFiftyCities:getFiftyCitiesNoSortService ,
  },
};

// Graphql schema
// export const schema = makeExecutableSchema({
//   resolvers,
//   typeDefs: graphqlModels,
// });



// The root provides a resolver function for each API endpoint
