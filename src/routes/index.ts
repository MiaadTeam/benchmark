import { Express, Request, Response, json } from "express"
import mongoRoutes from "./mongo.routes"
import mongooseRoutes from "./mongoose.routes"
import prismaRoutes from "./prisma.routes"

export default function (app: Express) {
    app.use(json())
    app.use("/mongoose/country", mongooseRoutes)
    app.use("/mongo/country", mongoRoutes)
    app.use("/prisma/country", prismaRoutes)
    // app.use("/typeorm/country", typeOrmRoutes)
    // app.use("/postgres/country", postgresRoutes)
    app.use("/",
        function helloWorld(_req: Request, res: Response) {
            return res.status(200).send(`Hello! welcome to the Lesan Benchmark!`)
        }
    )
}