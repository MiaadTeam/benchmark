import { Router } from "express"
import getFiftyCitiesOfCountrySorted from "../controllers/country/getFiftyCitieSorted"
import getFiftyCitiesOfCountryNoSort from "../controllers/country/getFiftyCitiesNoSort"
import seedController from "../controllers/seedController"
const router = Router()

/**
 *  also the crud of all entities are available in controller folder
 *  we add bench mark routes
 *  */
router.get( "/getFiftyCitiesOfCountryNoSort", getFiftyCitiesOfCountryNoSort )
router.get( "/getFiftyCitiesOfCountrySorted", getFiftyCitiesOfCountrySorted )
router.post("/seed", seedController )

export default router