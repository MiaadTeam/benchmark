import { Router } from "express"
import createCountry from "../express-mongoose/controllers/country/createCountry"
import deleteCountry from "../express-mongoose/controllers/country/deleteCountry"
import getFiftyCitiesOfCountry from "../express-mongoose/controllers/country/getFiftyCitieNoSort"
import getFiftyCitiesOfCountryNoSort from '../express-mongoose/controllers/country/getFiftyCitiesNoSort'
import getOneCountry from "../express-mongoose/controllers/country/getOneCountry"
import updateCountry from "../express-mongoose/controllers/country/updateCountry"
const router = Router()

router.get( "/fiftyCitiesOfFiftyProvincesNoSort", getFiftyCitiesOfCountryNoSort )
router.get( "fiftyCitiesOfFiftyProvincesSorted", getFiftyCitiesOfCountry )
router.post("/", createCountry )
router.put( "/:id", updateCountry )
router.get( "/:id", getOneCountry )
router.delete("/:id", deleteCountry)

export default router