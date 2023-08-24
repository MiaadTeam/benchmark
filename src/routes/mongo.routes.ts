import { Router } from "express"
import createCountry from "../express-mongo/controllers/country/createCountry"
import deleteCountry from "../express-mongo/controllers/country/deleteCountry"
import getFiftyCitiesOfCountry from "../express-mongo/controllers/country/getFiftyCitiesOfCountry"
import getOneCountry from "../express-mongo/controllers/country/getOneCountry"
import updateCountry from "../express-mongo/controllers/country/updateCountry"
const router = Router()

router.get( "/fiftyCitiesOfFiftyProvinces", getFiftyCitiesOfCountry )
router.post("/", createCountry )
router.put( "/:id", updateCountry )
router.get( "/:id", getOneCountry )
router.delete("/:id", deleteCountry)

export default router