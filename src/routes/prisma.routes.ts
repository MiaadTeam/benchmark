import { Router } from "express"
import createCountry from "../epxress-pg-prisma/controllers/country/createCountry"
import deleteCountry from "../epxress-pg-prisma/controllers/country/deleteCountry"
import getFiftyCitiesOfCountry from "../epxress-pg-prisma/controllers/country/getFiftyCitiesOfCountry"
import getOneCountry from "../epxress-pg-prisma/controllers/country/getOneCountry"
import updateCountry from "../epxress-pg-prisma/controllers/country/updateCountry"
const router = Router()

router.get( "/fiftyCitiesOfFiftyProvinces", getFiftyCitiesOfCountry )
router.post("/", createCountry )
router.put( "/:id", updateCountry )
router.get( "/:id", getOneCountry )
router.delete("/:id", deleteCountry)

export default router