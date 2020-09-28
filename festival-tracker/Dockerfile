# build environment
FROM node:latest as builder

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY ./app/package*.json /usr/src/app/

RUN npm install --silent

COPY ./app /usr/src/app

RUN npm run build

# production environment
FROM nginx:stable

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

COPY ./app/nginx /etc/nginx/

RUN chmod -R 777 /usr/share/nginx/html

ENV PORT $PORT

EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]