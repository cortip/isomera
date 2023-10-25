FROM node:lts-alpine as builder

WORKDIR /app

RUN yarn global add nx@latest

RUN yarn global add nodemon@latest

RUN chown -R 1000:1000 /app

ENTRYPOINT [ "node" ]
