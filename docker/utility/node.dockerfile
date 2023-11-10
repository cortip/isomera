FROM node:20-alpine as builder

WORKDIR /app

# Install Python 3
RUN apk update && apk add --no-cache python3 build-base && ln -sf python3 /usr/bin/python

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN yarn global add nx@latest

RUN yarn global add nodemon@latest

ENTRYPOINT [ "node" ]
