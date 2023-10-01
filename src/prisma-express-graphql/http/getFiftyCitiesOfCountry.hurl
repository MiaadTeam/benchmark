#run me:
#hurl --variables-file .env getFiftyCitiesOfCountry.hurl

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
  
```