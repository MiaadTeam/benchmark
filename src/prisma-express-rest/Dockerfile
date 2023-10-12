FROM node:18
COPY dataset ./dataset
# COPY --from=dataPath ./dataset
WORKDIR /src/app
COPY package*.json ./
COPY prisma ./prisma/
COPY . .
RUN yarn 

CMD [ "yarn", "run", "start:migrate" ]