import { Router } from "express"
import createCountry from "../../mongoose-express-rest/controllers/country/createCountry"
import deleteCountry from "../../mongoose-express-rest/controllers/country/deleteCountry"
import getFiftyCitiesSorted from "../../mongoose-express-rest/controllers/country/getFiftyCitieSorted"
import getFiftyCitiesOfCountryNoSort from '../../mongoose-express-rest/controllers/country/getFiftyCitiesNoSort'
import getOneCountry from "../../mongoose-express-rest/controllers/country/getOneCountry"
import updateCountry from "../../mongoose-express-rest/controllers/country/updateCountry"
const router = Router()

router.get( "/fiftyCitiesOfFiftyProvincesNoSort", getFiftyCitiesOfCountryNoSort )
router.get( "/fiftyCitiesOfFiftyProvincesSorted", getFiftyCitiesSorted )
router.post("/", createCountry )
router.put( "/:id", updateCountry )
router.get( "/:id", getOneCountry )
router.delete("/:id", deleteCountry)

export default router