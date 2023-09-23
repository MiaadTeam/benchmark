POST http://localhost:9900/graphql
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