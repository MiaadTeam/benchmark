to make the database work, you should be in the `prisma-pg/prisma` directory,
then in the command line enter this commands:
to create database:
	docker-compose up -d
	docker ps
to create prisma/prisma.schema tables (it will make init migrations):
	npx prisma migrate dev --name "init"
to generate tables of `prisma/schema.prisma` :
	npx prisma generate

	