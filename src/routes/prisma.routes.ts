import { Router } from "express"
import createCountry from "../database/postgresql/prisma-pg/services/controllers/country/createCountry"
import deleteCountry from "../database/postgresql/prisma-pg/services/controllers/country/deleteCountry"
import getFiftyCitiesOfCountry from "../database/postgresql/prisma-pg/services/controllers/country/getFiftyCitiesOfCountry"
import getOneCountry from "../database/postgresql/prisma-pg/services/controllers/country/getOneCountry"
import updateCountry from "../database/postgresql/prisma-pg/services/controllers/country/updateCountry"
const router = Router()

router.get( "/fiftyCitiesOfFiftyProvinces", getFiftyCitiesOfCountry )
router.post("/", createCountry )
router.put( "/:id", updateCountry )
router.get( "/:id", getOneCountry )
router.delete("/:id", deleteCountry)

export default router