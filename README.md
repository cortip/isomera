<br/>
<br/>
<br/>
<br/>
<p align="center">
  <img src="https://user-images.githubusercontent.com/723200/198200316-9aebcfda-19b8-414c-af44-1562daf6c802.png" alt="Isomera logo" />
</p>
<br/>
<br/>
<h1 align="center">Isomera - headless CMS for business representative websites</h1>
<br/>
<p align="center">
  <a href="https://doc.isomera.org" target="_blank">
    <img src="https://isomera-compodoc.vercel.app/images/coverage-badge-documentation.svg" alt="Doc" />
  </a>
  <a href="https://discord.gg/Q78c7yGB" target="_blank">
    <img src="https://img.shields.io/discord/1033259861917569094?label=Discord" alt="Isomera on Discord" />
  </a>
  <a href="https://github.com/cortip/isomera/actions/workflows/main.yml" target="_blank">
    <img src="https://github.com/cortip/isomera/actions/workflows/main.yml/badge.svg?branch=main" alt="CI" />
  </a>
  <a href="https://github.com/cortip/isomera/actions/workflows/codeql.yml" target="_blank">
    <img src="https://github.com/cortip/isomera/actions/workflows/codeql.yml/badge.svg" alt="Isomera Code QL Status" />
  </a>
  <a href="https://www.codefactor.io/repository/github/cortip/isomera" target="_blank">
    <img src="https://www.codefactor.io/repository/github/cortip/isomera/badge" alt="CodeFactor" />
  </a>
  <a href="https://cla-assistant.io/cortip/isomera" target="_blank">
    <img src="https://cla-assistant.io/readme/badge/cortip/isomera" alt="CLA assistant" />
  </a>
</p>
<br/>
<br/>

<p align="center">
  <i>SaaS that is hosted on the cloud and built by community. To make developer life easy.</i>
</p>

<br/>
<br/>
## Goals

- To make representative business websites development easier and faster;
- Remove the hassle of setting up backend hosting and database;
- Make it lightning fast for Next.js and Vercel combination by creating SDKs;
- No need to worry about Admin and admin user roles;
- Allow developers to take care of rocket science in configs and leave clients' blogging rights;

## Key features to be built

- Authentification with email, Google, and Facebook;
- Roles for developer and client;
- Models, entities, and data manipulation;
- Key / value settings;
- Ability to have contacts form and way to store that information (so we wouldn't have to figure out how to deal with contacts form separately...);
- Menus, a.k.a. navigation management;
- Media library and handling, compression to `.webp` format;
- Some analytics solutions to know what's going on;

So basically it's a simple CMS that would work best for representative simple business sites.

## Philosophy

In chemistry, isomers are molecules or polyatomic ions with identical molecular formulae – that is,
same number of atoms of each element – but distinct arrangements of atoms in space. Isomerism is
existence or possibility of isomers. Isomers do not necessarily share similar chemical or
physical properties.

Similar in WEB developers life - if you deal with simple representative websites, preparation for each is
more or less identical to all other. You need admin panel, you need to host is somewhere, you need database
for admin panel, you need to host website itself and so on. Most boring, repetitive part seems to be
Admin part so it was decided to build this headless CMS to allow way faster bootstrapping!

## Product roadmap

🚀 https://www.figma.com/file/h4TW7xZmZtsCikldbx9HVj/Isomera-Roadmap

# Contributions

Any kind of contributions are welcome! Feel free to open a PR with your changes ♥️

Please read our [Contributing Guide](./CONTRIBUTING.md) before submitting a Pull Request to the project.

![Alt Text](https://media2.giphy.com/media/z24q9PQNlw19u/giphy.gif)

# Coding

## Getting Started

### ⏳ Installation

Install Isomera with this **Quickstart** command to create a Isomera project instantly:

- (Use **yarn** to install the Isomera project (recommended). [Install yarn with these docs](https://yarnpkg.com/lang/en/docs/install/).)

```bash
yarn install
yarn start
```

This command generates a brand new project with the default features (authentication, permissions, content management, content type builder & file upload).

Enjoy 🎉

### Development

Locally it will use SQLite database so it would be easier to develop and test. For production, it is originally intended to be used with
PostgreSQL. It uses TypeORM so it's quite easy to adapt to any other database.

Project is managed by NX - next generation build system with first class monorepo support and powerful integrations.
Documentation can be found here https://nx.dev/getting-started/intro

Before any commit, make sure that your code is well linted, pretty and well formatted.
The following commands can help you do that automatically:

```shell
npx nx format:write
yarn prettier:fix
```

Also, turn on Prettier on save.

You can check if everything is ok by running these commands:

```shell
npx nx format
yarn prettier
yarn lint
```

### Built in tools

🚀 GraphQL http://localhost:3000/graphql

🚀 Swagger http://localhost:3000/swagger

### 🖐 Requirements

Complete installation requirements can be found in the documentation... TBD

**Supported operating systems**:

- Ubuntu LTS/Debian 9.x
- CentOS/RHEL 8
- macOS Mojave
- Windows 10
- Docker

(Please note that Isomera may work on other operating systems, but these are not tested nor officially supported at this time.)

**Node:**

- NodeJS >= 14 <= 18
- NPM >= 6.x

**Database:**

| Database   | Minimum | Recommended |
| ---------- | ------- | ----------- |
| MySQL      | 5.7.8   | 8.0         |
| MariaDB    | 10.3    | 10.6        |
| PostgreSQL | 11.0    | 14.0        |
| SQLite     | 3       | 3           |

**We recommend always using the latest version of Isomera to start your new projects**.

## Contributing

Please read our [Contributing Guide](./CONTRIBUTING.md) before submitting a Pull Request to the project.

## Community support

For general help using Isomera, please refer to [the official Isomera documentation](https://docs.isomera.org). For additional help, you can use one of these channels to ask a question:

- [Discord](https://discord.gg/Q78c7yGB) (For live discussion with the Community and Isomera team)
- [GitHub](https://github.com/cortip/isomera) (Bug reports, Contributions)
- [Documentation](https://doc.isomera.org) (Classes, Modules, Endpoints, all kinds of things)

## Contributors

<p>
  <a href="https://github.com/vygandas" target="_blank">
    <img src="https://github.com/vygandas.png" alt="Vygandas Pliasas" width="70" height="70" />
  </a>
  <a href="https://github.com/CristoferPortela" target="_blank">
    <img src="https://github.com/CristoferPortela.png" alt="Cristofer Portela" width="70" height="70" />
  </a>
</p>

## License

See the [LICENSE](./LICENSE) file for licensing information.
