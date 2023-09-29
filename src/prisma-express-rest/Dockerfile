FROM node:alpine
WORKDIR /src/express-prisma
COPY ../../package*.json ./
COPY ../../server  ./
COPY ../../.gitingnore  ./
COPY prisma ./
COPY .env ./
COPY ../../tsconfig.json ./
COPY . .