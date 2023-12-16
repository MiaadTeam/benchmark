import { Express, json } from "express"
import prismaRoutes from './prisma.routes'
export default function (app: Express) {
    app.use(json())
    app.use("/prisma/", prismaRoutes)
    // app.use("/",
    //     function helloWorld(_req: Request, res: Response) {
    //         return res.status(200).send(`Hello! welcome to the Lesan Benchmark!`)
    //     }
    // )
}