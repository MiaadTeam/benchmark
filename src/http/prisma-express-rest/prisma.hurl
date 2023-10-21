#run me:
#hurl --variables-file .env ./http/getFiftyCitiesOfCountry.hurl --test

GET http://localhost:{{SERVER_PORT}}/prisma/country/fiftyCitiesOfFiftyProvinces