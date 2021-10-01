FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm rebuild bcrypt

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "server" ]
