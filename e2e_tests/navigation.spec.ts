import { test } from '../fixtures/base_test';
import { checkConsoleErrors, Log } from './support/navigation.utils';
import { waitForConsoleLogsToSettle } from './support/utils';
import { SectionsLinks } from 'page_objects/home_page';

let logs: Log[] = [];

test.describe('Navigation to sections', () => {
  test.beforeEach(async ({ page, homePage, baseUrl }) => {
    logs = [];
    page.on('console', (msg) => {
      if (msg.type() == 'error') {
        logs.push({ message: msg.text(), type: msg.type() });
      }
    });
    await homePage.openWelcomePage(baseUrl);
  });

  test('Navigation to Account - No console errors ', async ({
    homePage,
    baseUrl,
    page
  }) => {
    await homePage.openTab(SectionsLinks.ACCOUNT);
    await waitForConsoleLogsToSettle(logs);
    await checkConsoleErrors(
      page,
      baseUrl,
      '/login.html',
      SectionsLinks.ACCOUNT,
      logs
    );
  });

  test('Navigation to Clothing - No console errors ', async ({
    homePage,
    baseUrl,
    page
  }) => {
    await homePage.openTab(SectionsLinks.CLOTHING);
    await waitForConsoleLogsToSettle(logs);
    await checkConsoleErrors(
      page,
      baseUrl,
      '/products.html',
      SectionsLinks.CLOTHING,
      logs
    );
  });

  test('Navigation to Shopping Bag - No console errors ', async ({
    homePage,
    baseUrl,
    page
  }) => {
    await homePage.openTab(SectionsLinks.SHOPPINGBAG);
    await waitForConsoleLogsToSettle(logs);
    await checkConsoleErrors(
      page,
      baseUrl,
      '/cart.html',
      SectionsLinks.SHOPPINGBAG,

      logs
    );
  });

  test('Navigation to About - No console errors', async ({
    homePage,
    baseUrl,
    page
  }) => {
    await homePage.openTab(SectionsLinks.ABOUT);
    await waitForConsoleLogsToSettle(logs);
    await checkConsoleErrors(
      page,
      baseUrl,
      '/about.html',
      SectionsLinks.ABOUT,
      logs
    );
  });

  test('Navigation to Home - No console errors ', async ({
    homePage,
    baseUrl,
    page
  }) => {
    await homePage.openTab(SectionsLinks.HOME);
    await waitForConsoleLogsToSettle(logs);
    await checkConsoleErrors(page, baseUrl, '/', SectionsLinks.HOME, logs);
  });
});
