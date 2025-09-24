import { expect } from '@playwright/test';
import { getNewUserEmail } from 'support/support_users';
import { test } from '../fixtures/base_test';


test.describe('Authentication tests flows - SSO - tier3', () => {
  test.beforeEach(async ({ page, welcomePage, welcomePageUrl }) => {
    await welcomePage.openWelcomePage(welcomePageUrl);
  });

  test('Valid login @smokeSSOTier3 @C11653', async ({
    page,
    welcomePage,
    welcomePageUrl,
  }) => {
    await welcomePage.clickTestHistoryButton();

    await expect(page).toHaveURL(welcomePageUrl + '/blog/', {
      timeout: 3000,
    });
  });
});


