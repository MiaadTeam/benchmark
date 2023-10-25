import { Express, Request, Response, json } from "express"
import mongooseRoutes from "./mongoose.routes"

export default function (app: Express) {
    app.use(json())
    app.use("/mongoose/", mongooseRoutes)
    app.use("/",
        function helloWorld(_req: Request, res: Response) {
            return res.status(200).send(`Hello! welcome to the Lesan Benchmark!`)
        }
    )
}