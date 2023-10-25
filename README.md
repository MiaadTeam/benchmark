# Purpose
[Lesan](https://github.com/MiaadTeam/lesan) is a framework that excels at the performance of reading data from embedded data with ease of writing and updating the embedded data.
Embedding sorted data (using MongoDB) has significant improvement on performance of data read and the main art of lesan is to provide ease of update for these sorted embedded data. But is it worth solving challenges like updating huge embedded data? 
The current benchmark is going to illustrate how [Lesan](https://github.com/MiaadTeam/lesan) differs with various combinations of ORM and APIs.
We will seed each database with the same dataset ( downloaded from kaggle.com ) and then query for 50 cities of 50 provinces in available countries.

# Tools
For our comparison we have used the hardware and software below:  
System: Asus GL552V, 16G of memory, core i7  
OS: Xubuntu 20.04  
WezTerm: a powerful cross-platform terminal emulator and multiplexer implemented in Rust.
Hurl: a command line tool that runs HTTP requests defined in a simple plain text format. We used it to test HTTP response times. When Hurl is used via the `--test` option, it does not consume any time to process the response object. So that is why we chose Hurl over most known tools like Postman, to have more precise results.

# Results
### Best
In each case, we tested every `orm-server-api` combination 10 times and marked the best result on their chart. We have compared the best results of each one to know how they differ with [Lesan](https://github.com/MiaadTeam/lesan) and then illustrated the records of each combination:  

![best-results](https://github.com/MiaadTeam/benchmark/assets/6236123/4146e561-55a3-4fd0-a6bb-61a37bb37532)
 
 We use this formula to calculate the difference : (B - A) ÷ A * 100  
 As you see on the chart:
 - [Lesan](https://github.com/MiaadTeam/lesan) returns data to client `1168%` faster than the `prisma-express-rest`. Which uses `PostgreSQL` as a database.
 - [Lesan](https://github.com/MiaadTeam/lesan) returns data to client `1417%` faster than the `prisma-express-graphql`. Which uses `PostgreSQL` as a database.
 - [Lesan](https://github.com/MiaadTeam/lesan) returns data to client `4435%` faster than the `mongoose-express-rest` (Note that we did not sort in this query)
 - [Lesan](https://github.com/MiaadTeam/lesan) returns data to client `72289%` faster than the `mongo-express-rest` (Note that we did not sort in this query)
 - [Lesan](https://github.com/MiaadTeam/lesan) returns data to client `298971%` faster than the `mongoose-express-rest` (used sortby population as a numeric field)

**Maybe we created the most performant framework in the world!**

Note: the services and database are the same for `prisma-express-rest` and `prisma-express-graphql`. The difference is because of the overhead of parsing for `gql`. Graphql used this method  to add a schema-defining API to other libraries, but [Lesan](https://github.com/MiaadTeam/lesan) provides a schema-defining API to other libraries plus type-safety with no overhead and also a more powerful playground!  

we ommited the first query for all ORM-API combinations to have more normalized results and then illustrated 10 tests, and the system is the same as we mentioned above.  

### deno-lesan
![results](https://github.com/MiaadTeam/benchmark/assets/7347769/7e86ad4a-fe2f-422b-836e-64c423eae67a)
 - test 1: 157 ms
 - test 2: 139 ms
 - test 3: 130 ms (best) 
 - test 4: 153 ms
 - test 5: 136 ms
 - test 6: 133 ms
 - test 7: 131 ms
 - test 8: 132 ms
 - test 9: 135 ms
 - test 10: 132 ms

### prisma-express-rest (PostgreSQL):

![results](https://github.com/MiaadTeam/benchmark/assets/7347769/4822b014-cd06-433e-88f4-4a483d219aa4)
 - test 1: 1814 ms
 - test 2: 1655 ms
 - test 3: 1784 ms
 - test 4: 1649 ms  ( best )
 - test 5: 1768 ms
 - test 6: 1810 ms
 - test 7: 1864 ms
 - test 8: 1667 ms
 - test 9: 1742 ms
 - test 10: 1854 ms

### prisma-express-graphql (PostgreSQL):
![results](https://github.com/MiaadTeam/benchmark/assets/7347769/4dfcdf00-39b9-4e01-a23a-dd6d9e6480fb)
 - test 1: 2131 ms 
 - test 2: 1988 ms
 - test 3: 2054 ms
 - test 4: 1973 ms  ( best )
 - test 5: 1990 ms
 - test 6: 2058 ms
 - test 7: 2033 ms
 - test 8: 1970 ms
 - test 9: 2112 ms
 - test 10: 1985 ms

### mongoose-express-rest :
Note that we did not sort in this query :
![mongoose-express-rest](test-results/mongoose-express-rest/noSort/results.png "mongoose-express-rest ( No sort )")
 - test 1: 6659 ms
 - test 2: 6134 ms
 - test 3: 5896 ms ( best )
 - test 4: 6105 ms
 - test 5: 5899 ms
 - test 6: 6028 ms
 - test 7: 5992 ms
 - test 8: 6033 ms
 - test 9: 6628 ms
 - test 10: 6033 ms

### mongo-express-rest :
![mongo-express-rest](test-results/mongo-express-rest/results.png "mongo-express-rest ( No sort )")
 - test 1: 100935  ms
 - test 2: 103958 ms
 - test 3: 94106 ms ( best ) 
 - test 4: 98903 ms
 - test 5: 100040 ms
 - test 6: 111294 ms
 - test 7: 112074 ms
 - test 8: 108156 ms
 - test 9: 102024 ms
 - test 10: 96959 ms
 
### mongoose-express-rest :
Note that we did not sort in this query :
![mongoose-express-rest](test-results/mongoose-express-rest/noSort/results.png "mongoose-express-rest ( No sort )")
 - test 1: 6659 ms
 - test 2: 6134 ms
 - test 3: 5896 ms ( best )
 - test 4: 6105 ms
 - test 5: 5899 ms
 - test 6: 6028 ms
 - test 7: 5992 ms
 - test 8: 6033 ms
 - test 9: 6628 ms
 - test 10: 6033 ms

### mongoose-express-rest :
we used sortby population as a numeric field:
![mongoose-express-rest](test-results/mongoose-express-rest/sorted/results.png "mongoose-express-rest ( used sortby )")
 - test 1: 391010 ms
 - test 2: 405115 ms
 - test 3: 393145 ms
 - test 4: 396225 ms
 - test 5: 389920 ms
 - test 6: 393057 ms
 - test 7: 432257 ms
 - test 8: 396880 ms
 - test 9: 461448 ms
 - test 10: 388793 ms  ( best )



# Running
### Prerequisites
We assume that you have a basic understanding of back-end development with JavaScript and also SQL and NoSQL databases.

### Usage
In the root of project, *test results* directory contains the `getFiftyCitiesOfCoutnry.hurl` file to easily query for our benchmark and also the results of each test on the same system. You can do these benchmarks on your own system.

basic setting:
1. To use the benchmarking repo, first we clone the repo using terminal:
   `git clone https://github.com/MiaadTeam/benchmark.git`
2. To install the dependencies change the directory to the project root, then enter: `yarn` 
3. Create a `.env` file like the `example.env` file

In `src` directory there are repo directories that are named in <orm-server-api> format, e.g:`prisma-express-rest`
We explain how to start with each one:  

### prisma-express-rest:  
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
  so for the first time, to seed the express server and Prisma ORM we enter :
   `yarn start --seed`
6. We can start the server with a seeded database:
   `yarn start`
7. As we are root of src/prisma-express-rest, to fetch our query:
   `hurl --variables-file .env ./http/getFiftyCitiesOfCountry.hurl --test`
So we can see the  test results 

If you are curious about the query, you can find it in this path:   `src/prisma-express-rest/services/country/getFiftyCitiesOfCountry.service.ts` 
let's have a look to the prisma query parameters:  
```
select: {
			name: true,
			abb: true,
			population:true,
			provinces: {
				take: limit*pageNumber,
				orderBy: {
					population: "desc"
				},
				select: {
					name: true,
					abb: true,
					population:true,
					cities: {
						select: {
							name: true,
							abb: true,
							population:true,
						},
						take: limit,
						orderBy: {
							population: "desc"
						},
					}
				}
			}
		}
```
We search for nested relations : limited number (default is 50) cities of provinces of each country with selection of name, abb and population and also order by population field in descending form.  

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


