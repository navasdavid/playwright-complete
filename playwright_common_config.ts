import { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'node:path';

// Read from ".env" file.
dotenv.config({ path: path.resolve(__dirname, '.env') });

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
