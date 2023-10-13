FROM node:lts-bookworm-slim
COPY dataset ./dataset
COPY tsconfig.json ./
# COPY --from=dataPath ./dataset
WORKDIR /src/app
COPY package*.json ./
COPY prisma ./prisma/
RUN yarn 
COPY . .

# Copy the wait-for-it.sh script
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
# Make it executable
RUN chmod +x /usr/local/bin/wait-for-it.sh

EXPOSE 3000

CMD [ "yarn", "start" ]