import { PlaywrightTestConfig } from '@playwright/test';
import path from 'node:path';
import loadEnvWithPreference from './e2e_tests/support/manage_env_variables';

// Load environment variables preferring CLI/process.env values over `.env` file.
// The loader will read from the `.env` next to this file when needed.

//loadEnvWithPreference(path.resolve(__dirname, '.env'));

const { source } = loadEnvWithPreference(path.resolve(__dirname, '.env'));
console.log('ENV SOURCE:', source);

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
