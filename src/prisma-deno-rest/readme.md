to make the database work, you should be in the `deno-pg-prisma/prisma` directory,
then in the command line enter this commands:
to create database:
	docker-compose up -d
	docker ps
then change directory to `/prisma-deno-rest`,
to create prisma/prisma.schema tables (it will make init migrations):
	deno run --allow-read --allow-env --allow-write npm:prisma@^4.5 init

	deno run -A npm:prisma@^4.5 db push
After that’s complete, we’ll need to generate a Prisma client for Data Proxy:
	deno run -A --unstable npm:prisma@^4.5 generate --data-proxy