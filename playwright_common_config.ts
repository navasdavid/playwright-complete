import { PlaywrightTestConfig } from '@playwright/test';

const defaultConfig: PlaywrightTestConfig = {
  testDir: './e2e_tests',
  outputDir: './test-results',
  timeout: 10 * 1000,
  fullyParallel: true,
  retries: 1,
  workers: 4,
  reporter: [['list'], ['html']],
  use: {
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    testIdAttribute: 'id'
  }
};

export default defaultConfig;
