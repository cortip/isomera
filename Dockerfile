FROM node:lts-alpine3.15 as builder
ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder
COPY . .
RUN yarn
