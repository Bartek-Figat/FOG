FROM node:14.15.5

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm rebuild bcrypt 

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]
