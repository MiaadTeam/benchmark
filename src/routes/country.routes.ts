import { Router } from "express"
import createCountry from "../database/mongo/pure/controllers/country/createCountry"
import deleteCountry from "../database/mongo/pure/controllers/country/deleteCountry"
import getOneCountry from "../database/mongo/pure/controllers/country/getOneCountry"
import updateCountry from "../database/mongo/pure/controllers/country/updateCounytry"
const router = Router()

router.post("/", createCountry )
router.put( "/:id", updateCountry )
router.get( "/:id", getOneCountry )
router.delete("/:id", deleteCountry)

export default router