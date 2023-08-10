import BaseRepository from "./baseRepository";
import {
  MODELS_NAME,
  ModelScalarFields,
  ModelStructure,
  ModelTypes
} from "./prisma-repo";

// This type will be used if you want to extends the functions in Country Class

/* eslint-disable @typescript-eslint/no-unused-vars */
type Where = ModelTypes[typeof MODELS_NAME.COUNTRY]["Where"];
type Select = ModelTypes[typeof MODELS_NAME.COUNTRY]["Select"];
type Include = ModelTypes[typeof MODELS_NAME.COUNTRY]["Include"];
type Create = ModelTypes[typeof MODELS_NAME.COUNTRY]["Create"];
type Update = ModelTypes[typeof MODELS_NAME.COUNTRY]["Update"];
type Cursor = ModelTypes[typeof MODELS_NAME.COUNTRY]["Cursor"];
type Order = ModelTypes[typeof MODELS_NAME.COUNTRY]["Order"];
// type Delegate = ModelTypes[typeof MODELS_NAME.COUNTRY]["Delegate"];
type GroupBy = ModelTypes[typeof MODELS_NAME.COUNTRY]["GroupBy"];
type Scalar = ModelScalarFields<typeof MODELS_NAME.COUNTRY>;
type Model = ModelStructure[typeof MODELS_NAME.COUNTRY];
/*  eslint-enable @typescript-eslint/no-unused-vars */

class Country extends BaseRepository(MODELS_NAME.COUNTRY) {}

export default Country;
