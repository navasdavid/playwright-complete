import { expect, Locator } from '@playwright/test';
import { test } from '../fixtures/base_test';

test('Check all links in Home section are returning a correct code', async ({
  page,
  homePage,
  baseUrl,
  request
}) => {
  await homePage.openWelcomePage(baseUrl);

  const linkLocators = await page.locator('a[href]').all();
  for (const linkLocator of linkLocators) {
    const href = await linkLocator.getAttribute('href');
    if (href) {
      // Handle relative URLs
      const url = href.startsWith('http')
        ? href
        : `https://pocketaces2.github.io/${href.replace(/^\//, '')}`;

      const response = await request.get(url);

      // I am ussing soft assertions to be able to test all links and report all errors
      expect
        .soft(
          response.status(),
          `Link ${url} is returning a ${response.status()} status code`
        )
        .toBeGreaterThanOrEqual(200);

      expect
        .soft(
          response.status(),
          `Link ${url} is returning a ${response.status()} status code`
        )
        .toBeLessThan(400);
    } else {
      throw new Error(
        'Link href is null or undefined for locator: ' + linkLocator.toString()
      );
    }
  }
});
