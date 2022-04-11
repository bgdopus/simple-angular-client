#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:alpine
EXPOSE 4200
COPY --from=node /app/dist/simple-angular-client /usr/share/nginx/html