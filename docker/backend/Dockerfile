FROM node:18-alpine

# RUN apk update
# RUN apk add g++ make python3 libtool autoconf automake

RUN mkdir /app
WORKDIR /app

RUN npm install -g @nestjs/cli firebase-tools

EXPOSE 80
EXPOSE 3000
EXPOSE 9005
