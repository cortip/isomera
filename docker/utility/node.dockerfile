FROM node:18-alpine as builder

WORKDIR /app

RUN apk add --no-cache --virtual .gyp python3 make g++
RUN apk update && apk add --no-cache python3 build-base && ln -sf python3 /usr/bin/python

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN yarn global add nx@latest

RUN yarn global add nodemon@latest

RUN yarn global add cypress

RUN chown -R 1000:1000 /app

ENTRYPOINT [ "node" ]
