FROM ubuntu:22.04

ARG NODE_MAJOR=18
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update
RUN apt-get install -y ca-certificates curl gnupg supervisor
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update
RUN apt-get install nodejs -y
RUN npm install -g npm
RUN npm install -g yarn

RUN apt-get install -y zip unzip supervisor libcap2-bin libpng-dev
RUN apt-get -y autoremove
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /app

COPY ./package.json ./

RUN yarn install --production=false
RUN yarn global add nx

COPY . .

RUN nx repair

RUN nx run api:build:production

COPY ./docker/deployments/start-container /usr/local/bin/start-container
COPY ./docker/deployments/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
RUN chmod +x /usr/local/bin/start-container

EXPOSE 3000

#ENTRYPOINT ["start-container"]
ENTRYPOINT ["nx", "run", "api:serve"]
#ENTRYPOINT ["bash"]
