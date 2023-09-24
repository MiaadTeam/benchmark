import { Router } from "express"
import createCountry from "../../express-prisma/controllers/country/createCountry"
import deleteCountry from "../../express-prisma/controllers/country/deleteCountry"
import getFiftyCitiesOfCountry from "../../express-prisma/controllers/country/getFiftyCitiesOfCountry"
import getOneCountry from "../../express-prisma/controllers/country/getOneCountry"
import updateCountry from "../../express-prisma/controllers/country/updateCountry"
const router = Router()

router.get( "/fiftyCitiesOfFiftyProvinces", getFiftyCitiesOfCountry )
router.post("/", createCountry )
router.put( "/:id", updateCountry )
router.get( "/:id", getOneCountry )
router.delete("/:id", deleteCountry)

export default router