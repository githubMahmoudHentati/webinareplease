FROM node:10.19.0 as build-stage



WORKDIR /app
COPY ./package.json ./

RUN npm install

RUN npm audit fix
COPY . .
RUN npm build
# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html

RUN ls /usr/share/nginx/html
COPY  ./nginx/nginx.conf /etc/nginx/conf.d/default.conf


WORKDIR /usr/share/nginx/html

COPY ./env.sh .
COPY .env .


RUN chmod +x env.sh


# Start Nginx server
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]