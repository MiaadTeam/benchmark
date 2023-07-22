import { Express, Request, Response, json } from "express"
import countryRoutes from "./country.routes"

export default function (app: Express) {
    app.use(json())
    app.use("/country", countryRoutes)
    app.use("/",
        function helloWorld(_req: Request, res: Response) {
            return res.status(200).send(`Hello! welcome to the Lesan Benchmark!`)
        }
    )
}