FROM node:lts-alpine AS client

WORKDIR /app


COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000


CMD ["npm", "start"]



