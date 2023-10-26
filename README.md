
# <span style="color: #2378A8; font-weight: 900;">ISOMERA</span> <span style="display: block; color: #1092DB; font-weight: 500; font-size: 1.8rem;">Enterprise grade Javascript/Typescript Starter Boilerplate Monorepo</span>

## Preview

* Landing page https://www.isomera.org/
* Platform https://app.isomera.org/
* Documentation https://doc.isomera.org/overview.html

## Goals

* To keep this starter project up to date and at best practices.
* Create training material to make your start easier.
* Keep UI as simple as possible, so you could choose whether to go with same SCSS, Styled Components, Material UI or Tailwind for your creation

## Technical TODO

- [x] NX monorepo workspace
- [ ] Landing page with Next.js
- [ ] CI & Tests
- [ ] Prettier & Linting
- [ ] Generated documentation for API with Compodoc
- [ ] Swagger for API endpoints
- [ ] DTO as shared lib
- [ ] Interfaces as shared lib
- [ ] Utils as shared lib (for example time formatting)
- [ ] TypeORM
- [ ] Plan a strict rules for timestamps (this is frequent problem for projects where users has to interact across multiple timezones)
- [ ] Connect S3
- [ ] Production Dockerfiles
- [ ] SSL in dev
- [ ] Email solution (prod/dev)
- [ ] Websockets for notifications and updates
- [ ] GDPR compliance
- [ ] DB migrations
- [ ] Easy solution for roles and access management
- [ ] ...

## Features plan

- [ ] User can Sign Up & Sign In using email
- [ ] User can Sign Up & Sign In using Google, Facebook, Apple or Microsoft
- [ ] User can Sign Up & Sign In using phone number (Twillio)
- [ ] User can reset password
- [ ] User can invite other team members to organization (org created for every user, if it's not needed, should be easy to disable or just ignore)
- [ ] User can enter company details to organization (for future billing)
- [ ] User can manage roles for team (OrgOwner, OrgAdmin, OrgManager, OrgFinance, OrgAnalytic, OrgSupport, OrgUser, OrgReadonly, OrgClientVIP, OrgClient)
- [ ] User can transfer organization ownership
- [ ] User can enable 2FA
- [ ] User can enforce 2FA for organization users
- [ ] User can edit basic profile details (name, photo)
- [ ] User can delete organization
- [ ] User can delete account
- [ ] ...
 
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

```
make nx run-many -- -t e2e
```

### Running services

#### Run API locally

This will launch API service on port 8080:

```
make nx serve-api
```

This will launch platform on port 4200:

```
make nx serve-platform
```

This will launch landing on port 3030:

```
make nx serve-landing
```
