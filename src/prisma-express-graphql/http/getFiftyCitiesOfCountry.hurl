POST http://localhost:9900/graphql

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