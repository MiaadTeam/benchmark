# run me in root of prisma-express-postgres:
# hurl --variables-file .env ./http/country/create.hurl --test

POST http://localhost:{{SERVER_PORT}}/prisma/province/create
Content-Type:application/json

{
	"name":"persia",
	"population":90000,
	"abb":"PR"
}
