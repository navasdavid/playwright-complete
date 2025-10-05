import { expect } from '@playwright/test';
import { test } from '../fixtures/base_test';
import { SectionsLinks } from 'page_objects/home_page';

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
  await expect(await accountPage.isLogOutButtonShown()).toBeTruthy();
});
