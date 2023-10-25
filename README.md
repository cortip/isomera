


serve-api


## Developing locally

### Getting started

#### Environment preparation

You will need to install `docker` and `make` into your machine to be able to work on this project. All other dependencies are managed via Docker util images and ran
via Make commands.

#### Using commands

You can use main commands the way you were used to, just with few small changes.
Since Make considers flags as it's own flags, not arguments being passed, you'd need to add `--` before flags. For example `make npm -- -v`. Otherwise it would give you version of make.

##### Adding node packages

```
make yarn add some-package
```

##### Using NX

```
make nx <whatever you need>
```

##### Using Node

```
make node index.js
```

If you need some other console tool, please modify `Makefile` and add installation of it to the node utils image at `docker/utils/node.dockerfile`. Consistency is important.

### Running Tests

This is pretty simple, just

```
make nx run-many -- -t test
```

### Running services

#### Run API locally

This will launch API service on port 8080.

```
make nx serve-api
```
