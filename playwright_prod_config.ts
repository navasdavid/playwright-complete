import { defineConfig, devices } from '@playwright/test';
import defaultConfig from 'playwright_common_config';
import { TestEnvironmentParameters } from './fixtures/base_test';

// config object with default configuration and environment specific configuration
export default defineConfig<TestEnvironmentParameters>({
  ...defaultConfig,
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        baseUrl: 'https://pocketaces2.github.io/fashionhub'
      }
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseUrl: 'https://pocketaces2.github.io/fashionhub'
      }
    }
  ]
});
