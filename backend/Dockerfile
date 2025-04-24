FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Set default environment variables
ENV PORT=3000 \
    NODE_ENV=development \
    DB_HOST=postgres \
    DB_PORT=5432 \
    DB_USER=postgres \
    DB_PASSWORD=postgres \
    DB_NAME=mydb

CMD ["npm", "run", "dev"] 