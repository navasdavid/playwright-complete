import { expect } from '@playwright/test';
import { test } from '../fixtures/base_test';
import { SectionsLinks } from 'page_objects/home_page';

test.describe('Authentication tests flows - SSO - tier3', () => {
  test('Valid login', async ({
    page,
    loginPage,
    baseUrl,
    accountPage,
    homePage
  }) => {
    await homePage.openWelcomePage(baseUrl);
    await homePage.openTab(SectionsLinks.ACCOUNT);
    await loginPage.doLogin('demouser', 'fashion123');
    await page.waitForTimeout(2000);
    await expect(await accountPage.isLogOutButtonShown()).toBeTruthy();
  });
});
