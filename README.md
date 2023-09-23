Purpose
Lesan framework exels in performance of reading data from embedded data with ease of writing and updating the embedded data. 
Current benchmark is going illustrate how Lesan differs with various combination of express and deno as server and MongoDB and Postgresql as the database.
we will seed each database with same dataset and then query for 50 cities of 50 province in available countries.

Usage
basic setting:
1.To use benchmarking repo, first we clone the repo:
   `git clone https://github.com/MiaadTeam/benchmark.git`
2.To install the depedencies change directory to the project root we enter: `yarn` 
3.Create a `.env` file like the `.env.example` file

In src directory there are these directories:
routes: contains the country routes to fetch our mentioned query 
server: contains express and deno which loads and seeds database via terminal arguments
dataset: contains almost all of contries, provinces and cities from kaggle.com
other directories are named in <server-database-orm> format, e.g:`express-pg-prisma`

We explain how to start with each one

**express-pg-prisma:**
1.We have provided a docker file for the database creation,
  so in the project root we compose it:
   `docker-compose -f ./prisma/docker-compose.yml up -d`
2.Now you can see it running with: 
   `docker-compose ps`
3.To create prisma/prisma.schema tables (it will make init migrations):
   `npx prisma migrate dev --name "init"`
4.To generate tables that are defined in `prisma/schema.prisma` file, we enter:
	 `npx prisma generate`
5.In general, to start a server we use this format: `yarn server --orm < --seed >`
  the seed argument tells the server to enter the data of dataset(countries, provinces and cities) into our database.
  so for the first time, to seed the express server and prisma orm we enter :
   `yarn express --prisma --seed`
6.We can start the server with seeded database:
   `yarn express --prisma`
7.Although we are able to query for the CRUD of the counties,
  we are going to fetch our Prisma Postgresql benchmark query:
   `curl http://localhost:9900/prisma/country/fiftyCitiesOfFiftyProvinces`
as the result we can will see such a result:

![alt text](Isolated.png "Title")

**express-mongoose:**
1.You should install MongoDB in your machine first. The installation instructions can be found at [Official MongoDB installation](https://www.mongodb.com/docs/manual/installation/) manual.
2.In general, to start a server we use this format: `yarn server --orm < --seed >`
  the seed argument tells the server to enter the data of dataset(countries, provinces and cities) into our database.
  so for the first time, to seed the express server and prisma orm we enter :
   `yarn express --mongoose --seed`
3.We can start the server with seeded database:
   `yarn express --mongoose`
4.Although we are able to query for the CRUD of the counties,
  we are going to fetch our benchmark query:
   `curl http://localhost:9900/mongoose/country/fiftyCitiesOfFiftyProvinces`

![alt text](Isolated.png "Title")
