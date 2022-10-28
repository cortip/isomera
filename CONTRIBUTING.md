# Contribute to Isomera

Isomera is an open-source project administered by [Cortip](https://www.cortip.com/). We appreciate your interest and efforts to contribute to Isomera. See the [LICENSE](https://github.com/cortip/isomera/blob/main/LICENSE) licensing information. All work done is available on GitHub.

We highly appreciate your effort to contribute, but we recommend you talk to a maintainer before spending a lot of time making a pull request that may not align with the project roadmap. Whether it is from Isomera or contributors, every pull request goes through the same process.

## Feature Requests

Feature Requests by the community are highly encouraged. Feel free to submit a new one or upvote an existing feature request on [Github Discussions](https://github.com/cortip/isomera/discussions/17).

## Code of Conduct

This project, and everyone participating in it, are governed by the [Isomera Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold it. Make sure to read the [full text](CODE_OF_CONDUCT.md) to understand which type of actions may or may not be tolerated.

## Contributor License Agreement (CLA)

### Individual contribution

You need to sign a Contributor License Agreement (CLA) to accept your pull request. You only need to do this once. If you submit a pull request for the first time, you can complete your CLA [here](https://cla-assistant.io/cortip/isomera?redirect=true), or our CLA bot will automatically ask you to sign before merging the pull request.

### Company contribution

If you make contributions to our repositories on behalf of your company, we will need a Corporate Contributor License Agreement (CLA) signed. To do that, please get in touch with us at [hi@cortip.com](mailto:hi@cortip.com).

## Documenting

We use Cmpodoc to generate documentation. Everything you code must have proper documentation added too.
Learn how to do it with Compodoc here https://compodoc.app/guides/tutorial.html

## Bugs

Isomera is using [GitHub issues](https://github.com/cortip/isomera/issues) to manage bugs. We keep a close eye on them. Before filing a new issue, try to ensure your problem does not already exist.

---

## Before Submitting a Pull Request

The Isomera core team will review your pull request and either merge it, request changes, or close it.

## Contribution Prerequisites

- You have [Node.js](https://nodejs.org/en/) at version >= v14 and <= v18 and [Yarn](https://yarnpkg.com/en/) at v1.2.0+ installed.
- You are familiar with [Git](https://git-scm.com).

**Before submitting your pull request** make sure the following requirements are fulfilled:

- Fork the repository and create your new branch from `main`.
- Run `yarn setup` in the root of the repository.
- If you've fixed a bug or added code that should be tested, please make sure to add tests
- Ensure the following test suites are passing:
  - `yarn test`
  - `yarn test:e2e`
- Make sure your code lints by running `yarn lint`.
- Make sure your code is pretty by running `yarn prettier`.
- If your contribution fixes an existing issue, please make sure to link it in your pull request.

---

## Miscellaneous

### Repository Organization

We chose to use a monorepo design using [NX](https://nx.dev/). This allows us to maintain the whole ecosystem keep it up-to-date and consistent.

We do our best to keep the master branch as clean as possible, with tests passing at all times. However, the master branch can move faster than the release cycle.

### Reporting an issue

Before submitting an issue you need to make sure:

- You are experiencing a technical issue with Isomera.
- You have already searched for related [issues](https://github.com/cortip/isomera/issues) and found none open (if you found a related _closed_ issue, please link to it from your post).
- You are not asking a question about how to use Isomera or about whether or not Isomera has a certain feature. For general help using Isomera, you may:
  - Refer to the [official Isomera documentation](https://docs.isomera.org).
  - Ask a member of the community in the [Isomera Discord Community](https://discord.gg/Q78c7yGB).
  - Ask a question on the [Isomera Github Discussions](https://github.com/cortip/isomera/discussions).
- Your issue title is concise, on-topic, and polite.
- You provide steps to reproduce the issue.
- You have tried all the following (if relevant), and your issue remains:
  - Make sure you have the right application started.
  - Make sure the [issue template](.github/ISSUE_TEMPLATE) is respected.
  - Make sure your issue body is readable and [well formatted](https://guides.github.com/features/mastering-markdown).
  - Make sure you've stopped the Isomera server with CTRL+C and restarted it.
  - Make sure your application has a clean `node_modules` directory, meaning:
    - you didn't link any dependencies (e.g., by running `yarn link`)
    - you haven't made any inline changes to files in the `node_modules` directory
    - you don't have any global dependency loops. If you aren't sure, the easiest way to double-check any of the above is to run: `$ rm -rf node_modules && yarn cache clean && yarn setup`.
