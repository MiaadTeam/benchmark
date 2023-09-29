import { Router } from "express"
import createCountry from "../../prisma-express-rest/controllers/country/createCountry"
import deleteCountry from "../../prisma-express-rest/controllers/country/deleteCountry"
import getFiftyCitiesOfCountry from "../../prisma-express-rest/controllers/country/getFiftyCitiesOfCountry"
import getOneCountry from "../../prisma-express-rest/controllers/country/getOneCountry"
import updateCountry from "../../prisma-express-rest/controllers/country/updateCountry"
const router = Router()

router.get( "/fiftyCitiesOfFiftyProvinces", getFiftyCitiesOfCountry )
router.post("/", createCountry )
router.put( "/:id", updateCountry )
router.get( "/:id", getOneCountry )
router.delete("/:id", deleteCountry)

export default router