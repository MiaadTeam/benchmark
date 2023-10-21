# docker compose up --remove-orphans --build
FROM node:18
COPY dataset ./dataset
COPY tsconfig.json ./
# COPY --from=dataPath ./dataset
WORKDIR /src/app
COPY package*.json ./
COPY prisma ./prisma/
COPY . .
RUN yarn 

# Copy the wait-for-it.sh script
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
# Make it executable
RUN chmod +x /usr/local/bin/wait-for-it.sh

ENTRYPOINT ["/bin/sh","-c","/usr/local/bin/wait-for-it.sh pg-db:5432 -t 30 -- "]

EXPOSE 3000