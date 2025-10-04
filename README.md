# Test Playwright

This document explains how to run the tests using Playwright as configured in `playwright.yaml`.

## Prerequisites

Ensure you have the following installed:

- nvm - [how to install](https://github.com/nvm-sh/nvm/blob/master/README.md#installing-and-updating)
- node v22.20.0: nvm install v22.20.0

## Installation

Install the necessary dependencies by running:

```bash
cd test_playwright
nvm use v22.20.0
npm install
npx playwright install
```

## Configuration

Make sure to have the right env vars configured. You can find the ones needed in [.env.test](.env.test) file, which you can export into a new `.env` file which will be automatically pulled. Bear in mind that you'll need some password of a user and an API key. If you are not sure where to take these from, ask for support from the QA automation team.

## Running Tests

To run the tests, you can set different options. An example of a command would be:

```bash
npx playwright test --config=playwright_stg_config.ts --project=chrome
```

Depending on the environment where you want to run the test, you should set in the command:

- for stg: --config=playwright_stg_config.ts

## Configuration

The test configuration is defined in the `playwright_common_config.ts` file. This is imported to the different config files for each environment, where the specific parameters to be used in each environment are set in the project object [playwright parameterize tests](ttps://playwright.dev/docs/test-parameterize):

- for stg: --config=playwright_stg_config.ts

Incluir personal accs token en .env
