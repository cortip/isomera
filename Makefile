args = `arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-${1}}`

# --- Initialization ---

devinit:
		docker build -f docker/utility/node.dockerfile . -t node-dev-env:latest

# --- Commands ---

npm:
		docker run -it --rm -v ./:/app --workdir="/app" --entrypoint="npm" node-dev-env:latest $(call args,defaultstring)

yarn:
		docker run -it --rm -v ./:/app --workdir="/app" --entrypoint="yarn" node-dev-env:latest $(call args,defaultstring)

nx:
		docker run -it --rm -v ./:/app --workdir="/app" --entrypoint="nx" node-dev-env:latest $(call args,defaultstring)

node:
		docker run -it --rm -v ./:/app --workdir="/app" --entrypoint="node" node-dev-env:latest $(call args,defaultstring)