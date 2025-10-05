import { PlaywrightTestConfig } from '@playwright/test';
import path from 'node:path';
import loadEnvWithPreference from './e2e_tests/support/manage_env_variables';

// load environment variables from CLI if exists and from .env if not
// Keeping the source element for debugging purposes

const { source } = loadEnvWithPreference(path.resolve(__dirname, '.env'));

const defaultConfig: PlaywrightTestConfig = {
  testDir: './e2e_tests',
  outputDir: './test-results',
  timeout: 120 * 1000,
  fullyParallel: true,
  retries: 0,
  workers: 4,
  reporter: [['list']],
  expect: {
    timeout: 10000
  },
  use: {
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    testIdAttribute: 'id'
  }
};

export default defaultConfig;
