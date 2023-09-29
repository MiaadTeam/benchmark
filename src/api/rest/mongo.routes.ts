import { Router } from "express"
import createCountry from "../../mongo-express-rest/controllers/country/createCountry"
import deleteCountry from "../../mongo-express-rest/controllers/country/deleteCountry"
import getFiftyCitiesOfCountry from "../../mongo-express-rest/controllers/country/getFiftyCitiesOfCountry"
import getOneCountry from "../../mongo-express-rest/controllers/country/getOneCountry"
import updateCountry from "../../mongo-express-rest/controllers/country/updateCountry"
const router = Router()

router.get( "/fiftyCitiesOfFiftyProvinces", getFiftyCitiesOfCountry )
router.post("/", createCountry )
router.put( "/:id", updateCountry )
router.get( "/:id", getOneCountry )
router.delete("/:id", deleteCountry)

export default router