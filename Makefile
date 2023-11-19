#!/usr/bin/make

# --- Load in .env ---

ifneq ("$(wildcard .env)","")
	include .env
	export $(shell sed 's/=.*//' .env)
endif

# --- Some prep ---

ARGS = `arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-${1}}`
DOCKER_RUN_CMD = docker run -it --rm -u $(shell id -u):$(shell id -g) -v ./:/app -v ~/.cache:/home/node/.cache --workdir="/app" --network="host"

# --- Initialization ---

devinit:
		docker build -f docker/utility/node.dockerfile . -t node-dev-env:latest --no-cache

# --- Commands ---

npm:
		$(call DOCKER_RUN_CMD) --entrypoint="npm" node-dev-env:latest $(call ARGS, defaultstring)

pnpm:
		$(call DOCKER_RUN_CMD) --entrypoint="pnpm" node-dev-env:latest $(call ARGS, defaultstring)

yarn:
		$(call DOCKER_RUN_CMD) --entrypoint="yarn" node-dev-env:latest $(call ARGS, defaultstring)

npx:
		$(call DOCKER_RUN_CMD) --entrypoint="npx" node-dev-env:latest $(call ARGS, defaultstring)

nx:
		$(call DOCKER_RUN_CMD) --entrypoint="nx" node-dev-env:latest $(call ARGS, defaultstring)

node:
		$(call DOCKER_RUN_CMD) --entrypoint="node" node-dev-env:latest $(call ARGS, defaultstring)

# --- Server stuff ---
serve-api:
		$(call DOCKER_RUN_CMD) --entrypoint="nx" node-dev-env:latest serve api --port 8080

serve-platform:
		$(call DOCKER_RUN_CMD) --entrypoint="nx" node-dev-env:latest serve platform --port 4200

serve-landing:
		$(call DOCKER_RUN_CMD) --entrypoint="nx" node-dev-env:latest serve landing --port 3030

# --- TypeORM actions ---
migrate:
		$(call DOCKER_RUN_CMD) --entrypoint="yarn" node-dev-env:latest migration:run
