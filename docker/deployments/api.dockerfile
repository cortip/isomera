FROM node:20 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install -g yarn
RUN yarn

COPY . .

EXPOSE 3000

CMD ["nx", "run", "api:production"]
