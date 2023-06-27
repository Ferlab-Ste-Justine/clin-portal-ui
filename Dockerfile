FROM node:18.1-alpine as builder

WORKDIR /code

COPY package.json package-lock.json /code/
RUN npm install

COPY public /code/public
COPY src /code/src
COPY .env tsconfig.json tsconfig.paths.json craco.config.js /code/
RUN npm run theme
RUN npm run build

FROM nginx:stable as server

COPY --from=builder /code/build /usr/share/nginx/html/

COPY static.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT [""]
CMD ["nginx", "-g", "daemon off;"]
