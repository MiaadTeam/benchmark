import { Router } from "express"
import createCountry from "../../express-mongoose/controllers/country/createCountry"
import deleteCountry from "../../express-mongoose/controllers/country/deleteCountry"
import getFiftyCitiesSorted from "../../express-mongoose/controllers/country/getFiftyCitieSorted"
import getFiftyCitiesOfCountryNoSort from '../../express-mongoose/controllers/country/getFiftyCitiesNoSort'
import getOneCountry from "../../express-mongoose/controllers/country/getOneCountry"
import updateCountry from "../../express-mongoose/controllers/country/updateCountry"
const router = Router()

router.get( "/fiftyCitiesOfFiftyProvincesNoSort", getFiftyCitiesOfCountryNoSort )
router.get( "/fiftyCitiesOfFiftyProvincesSorted", getFiftyCitiesSorted )
router.post("/", createCountry )
router.put( "/:id", updateCountry )
router.get( "/:id", getOneCountry )
router.delete("/:id", deleteCountry)

export default router