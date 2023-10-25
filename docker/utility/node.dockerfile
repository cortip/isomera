FROM node:alpine as builder

WORKDIR /app

RUN yarn global add nx@latest

RUN yarn global add nodemon@latest

VOLUME [ "./node_modules" ]

ENTRYPOINT [ "node" ]