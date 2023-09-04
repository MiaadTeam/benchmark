import { load } from "https://deno.land/std@0.200.0/dotenv/mod.ts";
import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { PrismaClient } from "./generated/client";

const envVars = await load();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: envVars.DATABASE_URL,
    },
  },
});
const app = new Application();
const router = new Router();


router
  .get("/", (context) => {
    context.response.body = "Welcome to the Dinosaur API!";
  })
  .get("/country", async (context) => {
    // Get all countrys.
    const countrys = await prisma.country.findMany();
    context.response.body = countrys;
  })
  .get("/country/:id", async (context) => {
    // Get one country by id.
    const { id } = context.params;
    const country = await prisma.country.findUnique({
      where: {
        id: Number(id),
      },
    });
    context.response.body = country;
  })
  .post("/country", async (context) => {
    // Create a new country.
    const { name, abb,population } = await context.request.body("json").value;
    const result = await prisma.country.create({
      data: {
        name,
		abb,
		population,
      },
    });
    context.response.body = result;
  })
  .delete("/country/:id", async (context) => {
    // Delete a country by id.
    const { id } = context.params;
    const country = await prisma.country.delete({
      where: {
        id: Number(id),
      },
    });
    context.response.body = country;
  });

app.use(router.routes());
app.use(router.allowedMethods());


await app.listen({ port: 8000 });