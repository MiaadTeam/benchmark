# run me in root of src/prisma-express-graphql:
# hurl --variables-file .env http/getFiftyCitiesOfCountry.hurl --test

POST http://localhost:{{SERVER_PORT}}/graphql
```graphql
{
  getFiftyCitiesOfCountry( pageNumber:1, limit:50){
    name
    provinces{
      name
		cities{
		  id,
		  name,
		  abb,
		  population,
		}
	}
  }
}