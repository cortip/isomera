<br />
<br />
<p align="center">
<img src='docs/assets/logo.svg' alt='Isomera' width='120px' />
</p>
<br />
<br />

# ISOMERA: The Ultimate Javascript/Typescript SaaS Boilerplate Monorepo for Modern Developers

Unlock the future of seamless SaaS development with ISOMERA, the
all-encompassing Javascript/Typescript starter boilerplate monorepo. Designed
for visionary developers, ISOMERA streamlines the creation of enterprise-grade
applications by providing a robust, modular, and scalable foundation. Whether
you're kickstarting a project with React, Next, Nest, or diving deep into
TypeORM, React Query, and Material UI, our platform is your ticket to
efficiency. Beyond a mere boilerplate, ISOMERA offers comprehensive
documentation, training materials, and a community-driven approach. Contribute
to the revolution, join a community of like-minded developers, and redefine the
standards of SaaS development.

Every developer understands the journey: starting with basic functionalities
and, over time, integrating advanced features like 2FA, role management, or
intricate middleware logic. At the outset, it might seem manageable, but as your
project scales and evolves, these additions can accumulate into months of
development time. Not to mention the effort spent ensuring earlier work
seamlessly integrates with new features. With ISOMERA, this narrative changes.
While not every feature on our ToDo list is immediate, our roadmap is designed
with foresight. As your project matures, ISOMERA grows with you, offering
advanced functionalities just when you need them. It's not just about the
initial boost; it's about the cumulative time and effort saved over the life of
your project. Dive straight into innovation, knowing the foundational and
advanced are already taken care of.

#### 🌟 Join the ISOMERA Revolution as an Open-Source Contributor! 🌟

Are you passionate about shaping the future of SaaS development? Looking for a
platform where your expertise can make a real difference? Welcome to ISOMERA! As
an open-source project, we believe in the collective genius of the developer
community. Your insights, skills, and dedication can help elevate ISOMERA to new
heights. Whether you're a seasoned expert or a newcomer eager to learn, there's
a space here for you. Dive into our code, collaborate with like-minded
innovators, and let's co-create the ultimate Javascript/Typescript boilerplate
for the next generation. Join the ISOMERA family and let's craft the future, one
line of code at a time. 🚀

## Thanks to our sponsors

<p align="center" style="text-align: center;">
  <a href="https://www.cortip.com" target="_blank" style="text-decoration: none;"><img src="https://raw.githubusercontent.com/cortip/isomera/main/docs/assets/sponsors/cortip.png" width="200" alt="Cortip" /></a>
  <a href="https://www.atlassian.com" target="_blank" style="text-decoration: none;"><img src="https://raw.githubusercontent.com/cortip/isomera/main/docs/assets/sponsors/atlassian.png" width="200" alt="Atlassian" /></a>
  <a href="https://sentry.io" target="_blank" style="text-decoration: none;"><img src="https://raw.githubusercontent.com/cortip/isomera/main/docs/assets/sponsors/sentry.png" width="200" alt="Sentry" /></a>
</p>

## Preview

- Landing page https://www.isomera.org/
- Platform https://app.isomera.org/
- Documentation https://doc.isomera.org/overview.html

## Links

- Blog https://isomera.blog
- Youtube https://www.youtube.com/@isomera
- LinkedIn https://www.linkedin.com/company/isomera
- Discord https://discord.gg/T3CBgm8yPT

## Tutorials

- Brief introduction into projects structure
  https://isomera.blog/project-structure-philosophy-and-hot-to-run-isomera-2023-12-08/

## Content

- [Global Configuration & Options](docs/Configuration.md)

## Goals

- Keep this starter project updated and aligned with best practices.
- Produce training materials to simplify your startup process.
- Maintain a streamlined UI, offering flexibility to choose between SCSS, Styled
  Components, Material UI, or Tailwind for your designs.

## Libraries pick

- TypeScript
- React
- React Query
- Next.js
- Nest.js
- TypeORM
- Formik
- Class-validator (for Formik validations & DTOs)
- Luxon

## SDLC ToDo

- [ ] Documentation: Getting Started
- [ ] Documentation: Going to Production
- [ ] Training video on how to get started
- [ ] Training video on best practices

## Technical ToDo

- [x] NX monorepo workspace
- [x] Landing page with Next.js
- [x] CI & Tests
- [x] Prettier & Linting
- [x] Generated documentation for API with Compodoc
- [x] Swagger for API endpoints
- [x] DTO as shared lib
- [x] React Query for app data storage
- [x] Interfaces as shared lib
- [x] Utils as shared lib (for example time formatting)
- [x] TypeORM & DB migrations
- [ ] Plan a strict rules for timestamps (this is frequent problem for projects
      where users has to interact across multiple timezones)
- [ ] Connect S3 or other object bucket
- [x] Production Dockerfiles
- [ ] SSL in development
- [x] Transactional emails and templates (prod/dev)
- [ ] Websockets for notifications and updates
- [ ] GDPR compliance
- [ ] Easy solution for roles and access management
- [ ] SQS queue and jobs - support heavy load
- [ ] Redis & Memcached for caching + tooling in code
- [ ] Production split for api and workers to allow better control on
      auto-scaling
- [ ] ...

## Features plan

- [x] User can Sign Up & Sign In using email
- [ ] User can Sign Up & Sign In using Google, Facebook, Apple or Microsoft
- [ ] User can Sign Up & Sign In using phone number (Twillio)
- [x] User can reset password
- [ ] User can invite other team members to organization (org created for every
      user, if it's not needed, should be easy to disable or just ignore)
- [ ] User can enter company details to organization (for future billing)
- [ ] User can manage roles for team (OrgOwner, OrgAdmin, OrgManager,
      OrgFinance, OrgAnalytic, OrgSupport, OrgUser, OrgReadonly, OrgClientVIP,
      OrgClient)
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

You will need to install `docker` and `docker-compose` (if not in the same package)
to be able to work on this project.

### Running Tests

This is pretty simple, just

```
nx run-many -- -t test
```

```
nx run-many -- -t e2e
```

### Running services

#### Run API locally

This will launch API service on port 8080:

```
nx run api:serve
```

This will launch platform on port 4200:

```
nx run platform:serve
```

This will launch landing on port 3030:

```
nx landing:serve
```

## REPL for Nest.js

```
npm run start -- --watch --entryFile repl
```

## Database

To create new migration, use this command:

`nx run api:migration-create --name awesome-migration`

_awesome-migration_ is the name of migration ;)

(if you forget to add `--name` flag, it will create new file in src dir)

And run this command to run all your migrations

`nx run api:migration-run`

## Contributors

The "Contribution Leaderboard" ranks users based on the number of commits they
have made in their pull requests, displaying them in descending order. <be />

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/cortip/isomera_contributors@main/.github-contributors/cortip_isomera.svg">
    <img src="https://cdn.jsdelivr.net/gh/cortip/isomera_contributors@main/.github-contributors/cortip_isomera.svg" />
  </a>
</p>
