# run me in root of src/mongoose-express-graphql:
# hurl --variables-file .env http/getFiftyCitiesOfCountry.hurl --test

POST http://localhost:{{SERVER_PORT}}/graphql
```graphql
{
	getFiftyCities{
	  provinces{
		cities{
		  id,
		  name,
		  abb,
		  population,
		}
	  }
	}
  }
  
```