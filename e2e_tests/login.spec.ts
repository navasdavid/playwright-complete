import { expect } from '@playwright/test';
import { test } from '../fixtures/base_test';

test.describe('Authentication tests flows - SSO - tier3', () => {
  test('Valid login', async ({ page, loginPage, baseUrl, accountPage }) => {
    await loginPage.openLoginPage(baseUrl);
    await loginPage.doLogin('demouser', 'fashion123');
    await page.waitForTimeout(2000);
    await expect(await accountPage.isLogOutButtonShown()).toBeTruthy();
  });
});
