import { Express, Request, Response, json } from "express"
import mongoRoutes from "./mongo.routes"

export default function (app: Express) {
    app.use(json())
    app.use("/mongo/", mongoRoutes)
    app.use("/",
        function helloWorld(_req: Request, res: Response) {
            return res.status(200).send(`Hello! welcome to the Lesan Benchmark!`)
        }
    )
}