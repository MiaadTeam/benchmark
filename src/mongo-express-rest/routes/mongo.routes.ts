import { Router } from "express"
import getFiftyCitiesOfCountry from "../controllers/country/getFiftyCitiesOfCountry"
import seedController from "../controllers/seedController"
const router = Router()

/**
 *  also the crud of all entities are available in controller folder
 *  we add bench mark routes
 *  */
router.get( "/getFiftyCitiesOfCountry", getFiftyCitiesOfCountry )
router.post("/seed", seedController )

export default router