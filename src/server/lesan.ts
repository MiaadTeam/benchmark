import {
  ActFn,
  InRelation,
  lesan,
  MongoClient,
  number,
  object,
  ObjectId,
  optional,
  OutRelation,
  string,
} from "/Users/syd/work/arc/lesan/mod.ts";

// =======================================================
// -------------------- SETUP App --------------------
// =======================================================

const coreApp = lesan();

const client = new MongoClient();

await client.connect("mongodb://127.0.0.1:27017/benchmark");

const db = client.database("benchmark");

coreApp.odm.setDb(db);

// =======================================================
// -------------------- MODEL Section --------------------
// =======================================================

// ===================== Country MODEL ===================
const countryPure = {
  name: string(),
  abb: string(),
  papulation: number(),
};

const countryInRel: Record<string, InRelation> = {
  provinces: {
    schemaName: "province",
    type: "many",
    optional: true,
  },
};

const countryOutRel: Record<string, OutRelation> = {
  cities: {
    schemaName: "city",
    number: 50,
    sort: { field: "_id", order: "desc", type: "objectId" },
  },
};

const countries = coreApp.odm.setModel(
  "country",
  countryPure,
  countryInRel,
  countryOutRel,
);

// ===================== Province MODEL ==================
const provincePure = {
  name: string(),
  abb: string(),
  papulation: number(),
};

const provinceInrel: Record<string, InRelation> = {
  country: {
    schemaName: "country",
    type: "one",
    optional: false,
  },
  cities: {
    schemaName: "country",
    type: "many",
    optional: true,
  },
};

const provinceOutrel = {};

const provinces = coreApp.odm.setModel(
  "province",
  provincePure,
  provinceInrel,
  provinceOutrel,
);

// ===================== City MODEL ==================
const cityPure = {
  name: string(),
  abb: string(),
  papulation: number(),
};

const cityInrel: Record<string, InRelation> = {
  country: {
    schemaName: "country",
    type: "one",
    optional: false,
  },
  province: {
    schemaName: "province",
    type: "one",
    optional: false,
  },
};

const cityOutrel = {};

const cities = coreApp.odm.setModel(
  "city",
  cityPure,
  cityInrel,
  cityOutrel,
);

// =======================================================
// -------------------- Function Section --------------------
// =======================================================

// ===================== Country Fucntions ===================
const addCountryValidator = () => {
  return object({
    set: object(countryPure),
    get: coreApp.schemas.selectStruct("country", 1),
  });
};

const addCountry: ActFn = async (body) => {
  return await countries.insertOne({
    doc: body.details.set,
    get: body.details.get,
  });
};

coreApp.acts.setAct({
  type: "dynamic",
  schema: "country",
  actName: "addCountry",
  validator: addCountryValidator(),
  fn: addCountry,
});

// ===================== Province Fucntions ===================

const addProvinceValidator = () => {
  return object({
    set: object({ ...provincePure, country: string() }),
    get: coreApp.schemas.selectStruct("province", 1),
  });
};

const addProvince: ActFn = async (body) => {
  return await provinces.insertOne({
    doc: body.details.set,
    get: body.details.get,
    relation: { country: new ObjectId(body.details.set.country) },
  });
};

coreApp.acts.setAct({
  type: "dynamic",
  schema: "province",
  actName: "addProvince",
  validator: addProvinceValidator(),
  fn: addProvince,
});

// ===================== City Fucntions ===================
const addCityValidator = () => {
  return object({
    set: object({ ...cityPure, country: string(), province: string() }),
    get: coreApp.schemas.selectStruct("city", 1),
  });
};

const addCity: ActFn = async (body) => {
  return await cities.insertOne({
    doc: body.details.set,
    get: body.details.get,
    relation: {
      country: new ObjectId(body.details.set.country),
      province: new ObjectId(body.details.set.province),
    },
  });
};

coreApp.acts.setAct({
  type: "dynamic",
  schema: "city",
  actName: "addCity",
  validator: addCityValidator(),
  fn: addCity,
});

// =======================================================
// -------------------- RUN App --------------------
// =======================================================
coreApp.runServer({ port: 8080, typeGeneration: false, playground: false });
