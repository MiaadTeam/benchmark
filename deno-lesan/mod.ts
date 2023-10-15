import {
  ActFn,
  Document,
  Filter,
  lesan,
  MongoClient,
  number,
  object,
  ObjectId,
  optional,
  size,
  string,
} from "https://deno.land/x/lesan@v0.0.79/mod.ts";

const coreApp = lesan();

const client = await new MongoClient("mongodb://127.0.0.1:27017/").connect();

const db = client.db("civil");

coreApp.odm.setDb(db);

// ================== MODEL SECTION ==================
// ------------------ Country Model ------------------
const countryPure = {
  name: string(),
  population: number(),
  abb: string(),
};
const countryRelations = {};
const countries = coreApp.odm.newModel(
  "country",
  countryPure,
  countryRelations,
);

// ------------------ User Model ------------------
const userPure = {
  name: string(),
  age: number(),
};

const users = coreApp.odm.newModel("user", userPure, {
  country: {
    optional: false,
    schemaName: "country",
    type: "single",
    relatedRelations: {
      users: {
        type: "multiple",
        limit: 50,
        sort: {
          field: "_id",
          order: "desc",
        },
      },
    },
  },
});

// ================== FUNCTIONS SECTION ==================
// ------------------ Country Founctions ------------------
// ------------------ Add Country ------------------
const addCountryValidator = () => {
  return object({
    set: object(countryPure),
    get: coreApp.schemas.selectStruct("country", { users: 1 }),
  });
};

const addCountry: ActFn = async (body) => {
  const { name, population, abb } = body.details.set;
  return await countries.insertOne({
    doc: {
      name,
      population,
      abb,
    },
    projection: body.details.get,
  });
};

coreApp.acts.setAct({
  schema: "country",
  actName: "addCountry",
  validator: addCountryValidator(),
  fn: addCountry,
});

// ------------------ Get Countries  ------------------
const getCountriesValidator = () => {
  return object({
    set: object({
      page: number(),
      limit: number(),
    }),
    get: coreApp.schemas.selectStruct("country", 1),
  });
};

const getCountries: ActFn = async (body) => {
  let {
    set: { page, limit },
    get,
  } = body.details;

  page = page || 1;
  limit = limit || 50;
  const skip = limit * (page - 1);

  return await countries
    .find({ projection: get, filters: {} })
    .skip(skip)
    .limit(limit)
    .toArray();
};

coreApp.acts.setAct({
  schema: "country",
  actName: "getCountries",
  validator: getCountriesValidator(),
  fn: getCountries,
});

// ------------------ User Founctions ------------------
// --------------------- Add User ----------------------
const addUserValidator = () => {
  return object({
    set: object({
      ...userPure,
      country: string(),
    }),
    get: coreApp.schemas.selectStruct("user", 1),
  });
};
const addUser: ActFn = async (body) => {
  const { country, name, age } = body.details.set;

  return await users.insertOne({
    doc: { name, age },
    projection: body.details.get,
    relations: {
      country: {
        _ids: new ObjectId(country),
        relatedRelations: {
          users: true,
        },
      },
    },
  });
};

coreApp.acts.setAct({
  schema: "user",
  actName: "addUser",
  validator: addUserValidator(),
  fn: addUser,
});

// --------------------- Get Users ----------------------
const getUsersValidator = () => {
  return object({
    set: object({
      page: number(),
      take: number(),
      countryId: optional(size(string(), 24)),
    }),
    get: coreApp.schemas.selectStruct("user", { country: 1 }),
  });
};
const getUsers: ActFn = async (body) => {
  let {
    set: {
      page,
      limit,
      countryId,
    },
    get,
  } = body.details;

  page = page || 1;
  limit = limit || 50;
  const skip = limit * (page - 1);
  const filters: Filter<Document> = {};
  countryId && (filters["country._id"] = new ObjectId(countryId));

  return await users
    .find({ projection: get, filters })
    .skip(skip)
    .limit(limit)
    .toArray();
};

coreApp.acts.setAct({
  schema: "user",
  actName: "getUsers",
  validator: getUsersValidator(),
  fn: getUsers,
});

// ================== RUM SECTION ==================
coreApp.runServer({ port: 8080, typeGeneration: false, playground: true });
