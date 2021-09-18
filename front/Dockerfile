FROM node:16.8-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

ENTRYPOINT ["npm", "start" ]
