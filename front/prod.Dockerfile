FROM node:16.8-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

ARG REACT_APP_GRAPHQL_URL
ARG REACT_APP_SUBSCRIPTION_URL
ARG REACT_APP_DOMAIN_NAME
ARG REACT_APP_CLIENT_DOMAIN

COPY . .
RUN npm run build

FROM fitiavana07/nginx-react

COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80

CMD nginx -g 'daemon off;'
