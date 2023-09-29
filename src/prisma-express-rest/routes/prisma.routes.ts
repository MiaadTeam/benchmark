import { Router } from "express"
import getFiftyCitiesOfCountry from "../controllers/country/getFiftyCitiesOfCountry"
import seedController from "../controllers/seedController"
const router = Router()

router.get( "/fiftyCitiesOfFiftyProvinces", getFiftyCitiesOfCountry )
router.post("/seed", seedController )

export default router