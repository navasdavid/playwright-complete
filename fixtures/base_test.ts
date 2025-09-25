import { test as baseTest } from '@playwright/test';
import AccountPage from 'page_objects/account_page';
import LoginPage from 'page_objects/login_page';
import WelcomePage from 'page_objects/welcome_page';

type pages = {
  welcomePage: WelcomePage;
  loginPage: LoginPage;
  accountPage: AccountPage;
};

export type TestEnvironmentParameters = {
  baseUrl: string;
};

const testPages = baseTest.extend<pages, TestEnvironmentParameters>({
  // Define a default value.
  // We can later override it in the config.

  baseUrl: [
    'https://pocketaces2.github.io/fashionhub',
    {
      option: true,
      scope: 'worker'
    }
  ],

  welcomePage: async ({ page }, use) => {
    await use(new WelcomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  }
});

export const test = testPages;
