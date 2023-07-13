import { MongoClient } from "mongodb";

// const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:27017/${process.env.DB_NAME}?maxPoolSize=2-&w=majority`;
const uri = `mongodb://localhost:27017/benchmark?maxPoolSize=2-&w=majority`;

const client = new MongoClient(uri);

export const initMongo = async () => {
  try {
    await client.connect();
    console.log("Mongodb connected ...");
  } catch (error) {
    console.log(error);
  }
};

export const getClient = () => {
  return client;
};

