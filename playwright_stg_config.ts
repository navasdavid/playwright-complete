import { defineConfig, devices } from '@playwright/test';
import defaultConfig from 'playwright_common_config';
import { TestOrganizationParameters } from './fixtures/base_test';

// config object with default configuration and environment specific configuration
export default defineConfig<TestOrganizationParameters>({
  ...defaultConfig,
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        welcomePageUrl: 'https://qarmy.ar',
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        welcomePageUrl: 'https://qarmy.ar',
      },
    },
  ],
});
