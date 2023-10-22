to make the database work, you should be in the `prisma-pg/prisma` directory,
then in the command line enter this commands:
to create database:
	docker compose up -d
	docker compose ps
Note: if you have Postgresql on you machine and want to use it,
fill the .env file with your credential and enter this command in your terminal 
sudo -u postgres createdb <POSTGRES_DB> 

to create prisma/prisma.schema tables (it will make init migrations):
	npx prisma migrate dev --name "init"
to generate tables of `prisma/schema.prisma` :
	npx prisma generate

	