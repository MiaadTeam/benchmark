import { Router } from "express"
import createCity from "../controllers/city/createCity"
import getManyCities from "../controllers/city/getManyCities"
import getOneCity from "../controllers/city/getOneCity"
import createCountry from "../controllers/country/createCountry"
import getFiftyCitiesOfCountry from "../controllers/country/getFiftyCitiesOfCountry"
import getManyCountry from "../controllers/country/getManyCountries"
import getOneCountry from "../controllers/country/getOneCountry"
import createProvince from "../controllers/province/createProvince"
// import getManyProvinces from "../controllers/province/getManyProvinces"
import getOneProvince from "../controllers/province/getOneProvince"
import seedController from "../controllers/seedController"
const router = Router()

/**
 *  also the crud of all entities are available in controller folder
 *  we add bench mark routes
 *  */
router.post( "/countries/create", createCountry )
router.get( "/countries/fiftyCitiesOfFiftyProvinces", getFiftyCitiesOfCountry )
router.get( "/countries/:countryId/provinces", getManyProvinces )
router.get( "/countries/:id", getOneCountry )
router.get( "/countries", getManyCountry )

router.post( "/provinces/create", createProvince )
router.get( "/provinces/:provinceId/cities", getManyCities )
router.get( "/provinces/:id", getOneProvince )

router.post( "/cities/create", createCity )
router.get( "/cities/:id", getOneCity )

router.post("/seed", seedController )

export default router