args = `arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-${1}}`

# --- Initialization ---

devinit:
		docker build -f docker/utility/node.dockerfile . -t node-dev-env:latest

# --- Commands ---

npm:
		docker run -it --rm -u $(id -u):$(id -g) -v ./:/app --workdir="/app" --entrypoint="npm" node-dev-env:latest $(call args,defaultstring)

yarn:
		docker run -it --rm -u $(id -u):$(id -g) -v ./:/app --workdir="/app" --entrypoint="yarn" node-dev-env:latest $(call args,defaultstring)

npx:
		docker run -it --rm -u $(id -u):$(id -g) -v ./:/app --workdir="/app" --entrypoint="npx" node-dev-env:latest $(call args,defaultstring)


nx:
		docker run -it --rm -u $(id -u):$(id -g) -v ./:/app --workdir="/app" --entrypoint="nx" node-dev-env:latest $(call args,defaultstring)

node:
		docker run -it --rm -u $(id -u):$(id -g) -v ./:/app --workdir="/app" --entrypoint="node" node-dev-env:latest $(call args,defaultstring)

# --- Server stuff ---
serve-api:
		docker run -it --rm -u $(id -u):$(id -g) -p '8080:3000' -v ./:/app --workdir="/app" --entrypoint="nx" node-dev-env:latest serve api