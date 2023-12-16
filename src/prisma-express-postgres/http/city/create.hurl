# run me in root of prisma-express-postgres:
# hurl --variables-file .env ./http/city/create.hurl --test

POST http://localhost:{{SERVER_PORT}}/prisma/city/create
Content-Type:application/json

{
	"name":"hegmataneh",
	"abb":"hgm",
	"population": 200100
}

HTTP 200