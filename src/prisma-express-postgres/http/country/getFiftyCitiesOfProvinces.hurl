# run me in root of prisma-express-postgres:
# hurl --variables-file .env ./http/country/getFiftyCitiesOfProvinces.hurl --test

GET http://localhost:{{SERVER_PORT}}/prisma/country/fiftyCitiesOfFiftyProvinces