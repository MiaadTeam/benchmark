FROM node:18 AS builder
COPY ./dataset ./
WORKDIR /src/app
COPY package*.json ./
COPY prisma ./prisma/
RUN yarn 
COPY . .
RUN yarn build 

FROM node:18
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD [ "yarn", "run", "start:migrate" ]