import { makeExecutableSchema } from "@graphql-tools/schema";
import getFiftyCitiesOfCountryService from "../../prisma-express-rest/services/country/getFiftyCitiesOfCountry.service";
import seedPrisma from "../prisma/seed";
    
// graphql models and queries types
export const typeDefs = `
    type Country {
        id: Int
        name: String
        abb: String
        population:Int
        provinces:[Province]
    }
    
    type Province {
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
    
    type Query {
        seedPrisma: String 
    }

    type Query {
        getFiftyCitiesOfCountry(
            limit: Int,
            pageNumber:Int
        ):[Country]
    }
`

// The root provides a resolver function for each API endpoint
export const resolvers = {
    Query: {
        seedPrisma: async() => {
            await seedPrisma()
            return "seeded successfully!"
        },
        getFiftyCitiesOfCountry: async(
            _: unknown,
            args: {limit:number,pageNumber:number},
        ) => {
            return await getFiftyCitiesOfCountryService(args.limit,args.pageNumber)
        },
    }
}

// Graphql schema
export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});



