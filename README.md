# Playwright E2E Tests (TypeScript)

This repository contains Playwright end-to-end tests written in TypeScript. The test suite is configured to run against local, staging and production environments and includes utilities to manage environment variables, build the TypeScript sources and produce HTML reports.

## 1. Prerequisites

Before running the tests, make sure you have the following installed and configured:

- `nvm` — Node Version Manager (used to select the project Node version)
- Recommended versions:
  - Node: v18+ ( v22.20.0 recommended) — use `nvm use v22.20.0` to match the exact environment
  - TypeScript: v5.9+ (see `devDependencies` in package.json)
- Docker Desktop — required to run the local demo application; make sure you are logged in to Docker Hub if you need to pull private images

Verify Node version:

```bash
nvm use v22.20.0
node -v
# should show v22.20.0
```

## 2. Installation

Install project dependencies and Playwright browsers:

```bash
cd .
nvm use v22.20.0
npm install
npx playwright install
```

This project requires a GitHub Personal Access Token (PAT) for some test utilities. Create a PAT with appropriate scopes (at least `repo` or scoped read access depending on use). Place the token in the project root `.env` file as described below:

```.env
# .env example
GITHUB_TOKEN=ghp_...your_token_here
```

How to get a PAT:

- GitHub documentation: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

## 3. Running Tests

There are scripts in `package.json` to run tests in different environments.

Local (runs the demo app in Docker):

```bash
npm run test:local
```

- When running locally the test runner starts a Docker container using the image `pocketaces2/fashionhub-demo-app` and maps it to port `4000` on localhost. The container is stopped and removed at the end of the run.
- The local runs use the `list` reporter by default (console-friendly output).

Staging:

```bash
npm run test:stg
```

Production:

```bash
npm run test:prod
```

- Staging and production runs target the public URLs configured in the corresponding Playwright configuration files. These runs use both the `html` and `list` reporters. When finished an HTML report is generated in the `playwright-report` directory and opened in the default browser.

Compilation step:

- Tests are compiled before execution. The TypeScript compiler (`tsc`) emits compiled JS files into `./dist`. The `test:run:local` script runs `npm run build` (which executes `npx tsc`) before launching Playwright.

## 4. Configuration

There are four main Playwright configuration files in the repository:

- `playwright_common_config.ts` — common settings used by all environments
- `playwright_stg_config.ts` — settings specific to the staging environment
- `playwright_prod_config.ts` — settings specific to the production environment
- `playwright_stg_config.ts` — settings specific to the staging environment

Default browsers

- By default the test projects are configured to run on the Desktop Chrome and Desktop Firefox device profiles. You can change which browsers or device profiles are used by editing the environment-specific Playwright config files. The project uses Playwright's "parameterized projects" strategy so different browsers (or other per-project settings) are defined as separate projects in the config files.

Read more about parameterized projects here:
https://playwright.dev/docs/test-parameterize#parameterized-projects

Environment variables

- The tests can obtain environment variables either from the CLI (process environment) or from a `.env` file in the project root. The selection of which source to prefer is controlled by the environment variable `PREFER_ENV_SOURCE`.

  - If `PREFER_ENV_SOURCE=cli`, CLI-provided environment variables are preferred.
  - If `PREFER_ENV_SOURCE=file`, the `.env` file is preferred.
  - If `PREFER_ENV_SOURCE` is not set, the default behavior prefers CLI values.

- The loader will fallback to the alternate source if the preferred source does not provide the requested variable (for example if `.env` is missing when `file` is preferred).

## 5. Outputs

The test run produces several outputs:

- Test results: a per-run output set is stored under `test-results/` (screenshots, traces, etc.)
- Console output: when using the `list` reporter you will see test progress and results on the console (used for local, staging and production runs)
- HTML report: when running in staging or production the `html` reporter is used; the report is saved in `playwright-report/` and opened automatically at the end of the run
- Pull requests CSV: tests that interact with GitHub produce a `pull_requests.csv` file in the project root containing open PRs relevant to the test scenario

  Note on PR CSV generation: the logic that produces `pull_requests.csv` could equally be implemented as a small standalone script (for example a lightweight Node script that calls the GitHub API). For simplicity this project implements it as one of the Playwright test cases so it runs with the rest of the suite. To avoid running it twice, the PR-CSV test is restricted to run only on Chrome.

## Troubleshooting

- If Docker fails to start the demo image, inspect logs with `docker logs fashionhub-demo` and ensure Docker Desktop is running and you are logged into Docker Hub if needed.
- If the build fails, run `npm run build` locally to see TypeScript errors.
- If environment variables are not found, verify the `.env` file exists and the GITHUB_TOKEN value is correctly configured. In addition check that the `PREFER_ENV_SOURCE` setting is correct for your desired behavior.
