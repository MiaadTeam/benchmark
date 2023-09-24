import { Router } from "express"
import createCountry from '../../express-typeorm/controllers/country/createCountry'
const router = Router()

// router.get( "/fiftyCitiesOfFiftyProvinces", getFiftyCitiesOfCountry )
router.post("/", createCountry )
// router.put( "/:id", updateCountry )
// router.get( "/:id", getOneCountry )
// router.delete("/:id", deleteCountry)

export default router