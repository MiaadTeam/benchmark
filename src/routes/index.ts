import { Express, json } from "express"
import countryRoutes from "./country.routes"

export default function (app:Express) {
    app.use(json())
    app.use("/country", countryRoutes)
}
