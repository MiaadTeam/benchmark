import {
  ActFn,
  boolean,
  lesan,
  MongoClient,
  number,
  object,
  optional,
  string,
} from "/Users/syd/work/arc/lesan/mod.ts";

const coreApp = lesan();

const client = await new MongoClient("mongodb://127.0.0.1:27017/").connect();

const db = client.db("lesan-bench");

coreApp.odm.setDb(db);

// ================== MODEL SECTION ==================
// ------------------ Country Model ------------------
const pure = {
  name: string(),
  population: number(),
  abb: optional(string()),
  index: number(),
};
const countryRelations = {};
const countries = coreApp.odm.newModel(
  "country",
  pure,
  countryRelations,
);

// ------------------ State Model ------------------
const provinces = coreApp.odm.newModel("province", pure, {
  country: {
    optional: false,
    schemaName: "country",
    type: "single",
    relatedRelations: {
      provinces: {
        type: "multiple",
        limit: 50,
        sort: {
          field: "population",
          order: "desc",
        },
      },
    },
  },
});

// ------------------ City Model ------------------
const cities = coreApp.odm.newModel("city", pure, {
  country: {
    optional: false,
    schemaName: "country",
    type: "single",
    relatedRelations: {
      cities: {
        type: "multiple",
        limit: 50,
        sort: {
          field: "population",
          order: "desc",
        },
      },
    },
  },
  province: {
    optional: false,
    schemaName: "province",
    type: "single",
    relatedRelations: {
      cities: {
        type: "multiple",
        limit: 50,
        sort: {
          field: "population",
          order: "desc",
        },
      },
    },
  },
});

// ================== FUNCTIONS SECTION ==================
// ------------------ Country Founctions ------------------
// ------------------ Add Country ------------------
const seedValidator = () => {
  return object({
    set: object({ city: optional(boolean()), province: optional(boolean()) }),
    get: coreApp.schemas.selectStruct("country", 1),
  });
};

const seed: ActFn = async (body) => {
  const { city, province } = body.details.set;
  const data = JSON.parse(
    await Deno.readTextFile("../src/dataset/dataparsed.json"),
  ) as any[];

  const insertedCountry = await countries.insertMany({
    docs: data.map((cn, index) => ({
      name: cn.name,
      population: cn.population,
      abb: cn.abb,
      index,
    })) as any,
  });

  for await (const index of insertedCountry.keys()) {
    if (data[index].provinces.length > 0) {
      const insertedProvinces = await provinces.insertMany({
        docs: data[index].provinces.map((st: any, index: number) => ({
          name: st.name,
          population: st.population,
          abb: st.abb,
          index,
        })),
        relations: {
          country: {
            _ids: insertedCountry[index]._id,
            relatedRelations: { provinces: true },
          },
        },
      });
      for await (const provinceIdx of data[index].provinces.keys()) {
        if (data[index].provinces[provinceIdx].cities.length > 0) {
          await cities.insertMany({
            docs: data[index].provinces[provinceIdx].cities.map((
              st: any,
              index: number,
            ) => ({
              name: st.name,
              population: st.population,
              abb: st.abb,
              index,
            })),
            relations: {
              country: {
                _ids: insertedCountry[index]._id,
                relatedRelations: { cities: true },
              },
              province: {
                _ids: insertedProvinces.find((p) =>
                  p.index === provinceIdx
                )!._id,
                relatedRelations: { cities: true },
              },
            },
          });
        }
      }
    }
  }

  return "nice";
};

coreApp.acts.setAct({
  schema: "country",
  actName: "seed",
  validator: seedValidator(),
  fn: seed,
});

// ------------------ Get Countries ------------------
const getCountriesValidator = () => {
  return object({
    set: object({
      page: number(),
      take: number(),
    }),
    get: coreApp.schemas.selectStruct("country", 2),
  });
};
const getCountries: ActFn = async (body) => {
  const {
    set: { page, take },
    get,
  } = body.details;
  const pipeline = [];

  pipeline.push({ $skip: (page - 1) * take });
  pipeline.push({ $limit: take });

  return await countries
    .aggregation({
      pipeline,
      projection: get,
    })
    .toArray();
};

coreApp.acts.setAct({
  schema: "country",
  actName: "getCountries",
  validator: getCountriesValidator(),
  fn: getCountries,
});
// ------------------ Get Countries  ------------------
coreApp.runServer({ port: 1366, typeGeneration: false, playground: true });
