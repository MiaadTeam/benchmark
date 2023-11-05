# run me in root of src/mongo-express-rest:
# hurl  --variables-file .env http/getFiftyCitiesOfCountry.hurl --test

GET http://localhost:{{SERVER_PORT}}/mongo/getFiftyCitiesOfFiftyProvinces