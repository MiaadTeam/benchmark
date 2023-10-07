FROM node:14 AS builder

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN yarn 

COPY . .
RUN yarn build
EXPOSE 3040

CMD [ "yarn", "run", "start:migrate" ]