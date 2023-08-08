import _ from "lodash";
import BaseRepository from "./baseRepository";
import {
  AnyRecord,
  ModelStructure,
  ModelTypes,
  ModelScalarFields,
  MODELS_NAME,
} from "./prisma-repo";

// This type will be used if you want to extends the functions in Province Class

/* eslint-disable @typescript-eslint/no-unused-vars */
type Where = ModelTypes[typeof MODELS_NAME.PROVINCE]["Where"];
type Select = ModelTypes[typeof MODELS_NAME.PROVINCE]["Select"];
type Include = ModelTypes[typeof MODELS_NAME.PROVINCE]["Include"];
type Create = ModelTypes[typeof MODELS_NAME.PROVINCE]["Create"];
type Update = ModelTypes[typeof MODELS_NAME.PROVINCE]["Update"];
type Cursor = ModelTypes[typeof MODELS_NAME.PROVINCE]["Cursor"];
type Order = ModelTypes[typeof MODELS_NAME.PROVINCE]["Order"];
type Delegate = ModelTypes[typeof MODELS_NAME.PROVINCE]["Delegate"];
type GroupBy = ModelTypes[typeof MODELS_NAME.PROVINCE]["GroupBy"];
type Scalar = ModelScalarFields<typeof MODELS_NAME.PROVINCE>;
type Model = ModelStructure[typeof MODELS_NAME.PROVINCE];
/*  eslint-enable @typescript-eslint/no-unused-vars */

class Province extends BaseRepository(MODELS_NAME.PROVINCE) {}

export default Province;
