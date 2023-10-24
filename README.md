**Purpose**  
[Lesan](https://github.com/MiaadTeam/lesan) is a framework that excels at the performance of reading data from embedded data with ease of writing and updating the embedded data.
Embedding sorted data (using MongoDB) has significant improvement on performance of data read and the main art of lesan is to provide ease of update for these sorted embedded data. But is it worth solving challenges like updating huge embedded data? 
The current benchmark is going to illustrate how [Lesan](https://github.com/MiaadTeam/lesan) differs with various combinations of ORM and APIs.
We will seed each database with the same dataset ( downloaded from kaggle.com ) and then query for 50 cities of 50 provinces in available countries.

**Tools**
For our comparison we have used the hardware and software below:
System: Asus GL552V, 16G of memory, core i7
OS: Xubuntu 20.04
WezTerm: a powerful cross-platform terminal emulator and multiplexer implemented in Rust.
Hurl: a command line tool that runs HTTP requests defined in a simple plain text format. We used it to test HTTP responses. When Hurl is used via the `--test` option, it does not consume any time to process the response object. So that is why we chose Hurl over most known tools like Postman, to have more precise results.

**Results**
In each case, we tested every `orm-server-api` combination 10 times and marked the best result on their chart. We have compared the best results of each one to know how they differ with [Lesan](https://github.com/MiaadTeam/lesan) and then illustrated the records of each combination:  

![Comparison of best results of lesan VS other ORMs](https://mermaid.ink/svg/pako:eNqFU8tq3DAU_ZWLIJCA4_FTtrwrtM2m0EVKCcEbjS2PRfVwLTnMdJh_71WcR2co7cb4HOmce3R1dSSd7QVpyNUVeAtOCJiFW5R3YI2SRjQwej-5ZrPRYtZc9rGST2LTmh033rcGAFrvpVcCvo0CtsL5d4cBselGzecfwQ887nBc4-fgvNANfHCLg7svZZl9jyCld0GihbbzIYLOzkJWEXy9b-Bh2S7GL5AlcVLANUgDWiolneis6R3cYIoQBXruxWeLQT08rAzfS_fCXLmVQpWXGGeQs1uPAEo4bm57YewtpvcYJk9AO1xpIHlG59K18MpNs3Sa34r9hFL3qqcFCwarHMG53o9y_rt8N_Np_KlQxKr83QHBRXg7-3GltDU7a504iwDXxnpwuEv0NxGUNaPrgVbDgC-7MZwZ_suNFWlyZvdMXLRI7v8TMNjB9gAczILTJTuY7LQo_hJHqFAqr-uK5X_cxUqQiLwMJA7vMZRpCY6XFi1p8LcXA8cZbElrTriVL97eH0xHGj8vIiLLFAblo-TYbU2agSv3xn7qpbfzG6ks7wXCI_GHKbyUnXQeLfH-B7kL_DIrpF-fSViOd9KPyzburN442Y8cr-qJ0Q3NaM2zXNAq52We9902ZfWQFenQV0macXI6RWTi5tFa_RoVYSiyJ00WVwUtWZJWSYlqWkfkQJo0z-I8TRhjZZGUVZ1l6PHr2SCNi5wWaZ2xgiWUpjQ7_QbqCjyw
 "Comparison of best results of clean VS other ORMs")
 
 We use this formula to calculate the difference : (B - A) ÷ A * 100
 As you see on the chart:
 [Lesan](https://github.com/MiaadTeam/lesan) reads the database 1168% faster than the `prisma-express-rest`.
 [Lesan](https://github.com/MiaadTeam/lesan) reads the database 1417% faster than the `prisma-express-graphql`.
 [Lesan](https://github.com/MiaadTeam/lesan) reads the database 4435% faster than the `mongoose-express-rest` (Note that we did not sort in this query)
 [Lesan](https://github.com/MiaadTeam/lesan) reads the database 72289% faster than the `mongo-express-rest` (Note that we did not sort in this query)
[Lesan](https://github.com/MiaadTeam/lesan) reads the database 298971% faster than the `mongoose-express-rest` (used sortby)

*Maybe we created the most performant framework in the world!*

Note: the services and database are the same for `prisma-express-rest` and `prisma-express-graphql`. The difference is because of the overhead of parsing for `gql`. Graphql used this method to provide to add a schema-defining API to other libraries, but [Lesan](https://github.com/MiaadTeam/lesan) provides a schema-defining API to other libraries plus type-safety with no overhead and also a more powerful playground!


**Prerequisites**
We assume that you have a basic understanding of back-end development with JavaScript and also SQL and NoSQL databases.

**Usage**
In the root of project, *test results* directory contains the `getFiftyCitiesOfCoutnry.hurl` file to easily query for our benchmark and also the results of each test on the same system. You can do these benchmarks on your own system.

basic setting:
1. To use the benchmarking repo, first we clone the repo using terminal:
   `git clone https://github.com/MiaadTeam/benchmark.git`
2. To install the dependencies change the directory to the project root, then enter: `yarn` 
3. Create a `.env` file like the `example.env` file

In `src` directory there are repo directories that are named in <orm-server-api> format, e.g:`prisma-express-rest`
We explain how to start with each one:

*prisma-express-rest:*
1. We have provided a docker file for the database creation,
  so in the Benchmark root, we compose it:
   `cd ./src/prisma-express-rest`
   `docker-compose up -d`

2. Now you can see it running with: 
   `docker-compose ps`
3. To create prisma/prisma.schema tables (it will make init migrations):
   `npx prisma migrate dev --name "init"`
4. To generate tables that are defined in `prisma/schema.prisma` file, we enter:
   `npx prisma generate`
5. In general, to start a server we use this format: `yarn start < --seed >`
  the seed argument tells the server to enter the data of the dataset(countries, provinces, and cities) into our database.
  so for the first time, to seed the express server and Prisma orm we enter :
   `yarn start --seed`
6. We can start the server with a seeded database:
   `yarn start`
7. As we are root of src/prisma-express-rest, to fetch our query:
   `hurl --variables-file .env ./http/getFiftyCitiesOfCountry.hurl --test`
So we can see the similar results :
![prisma-express-rest](.test-results/prisma-express-rest/http/results.png "prisma-express-rest ( PostgreSQL )")

*mongoose-express-rest:*
1. You should install MongoDB on your machine first. The installation instructions can be found at [Official MongoDB installation](https://www.mongodb.com/docs/manual/installation/) manual.
2. In general, to start a server we use this format: `yarn start < --seed >`
the seed argument tells the server to enter the data of the dataset(countries, provinces, and cities) into our database.
  so for the first time, to seed the express server and Mongoose ORM we enter :
   `yarn start --seed`
3. We can start the server with a seeded database:
   `yarn start`
4.  As we are root of src/mongoose-express-rest, to fetch our query:
      `hurl --variables-file .env ./http/getFiftyCitiesOfCountryNoSrot.hurl --test`

![mongoose-express-rest](.test-results/mongoose-express-rest/http/results.png "mongoose-express-rest ( No sort )")
