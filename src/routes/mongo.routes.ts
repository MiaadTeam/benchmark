import { Router } from "express"
import createCountry from "../database/mongo/pure/controllers/country/createCountry"
import deleteCountry from "../database/mongo/pure/controllers/country/deleteCountry"
import getCountryProvinces from "../database/mongo/pure/controllers/country/getCountryProvinces"
import getFiftyCitiesOfCountry from "../database/mongo/pure/controllers/country/getFiftyCitiesOfCountry"
import getOneCountry from "../database/mongo/pure/controllers/country/getOneCountry"
import updateCountry from "../database/mongo/pure/controllers/country/updateCountry"
const router = Router()

router.get( "/:id/provinces",  getCountryProvinces)
router.get( "/fiftyCitiesOfFiftyProvinces", getFiftyCitiesOfCountry )
router.post("/", createCountry )
router.put( "/:id", updateCountry )
router.get( "/:id", getOneCountry )
router.delete("/:id", deleteCountry)

export default router