import { expect } from '@playwright/test';
import { test } from '../fixtures/base_test';
import { SectionsLinks } from 'page_objects/welcome_page';

const logs: {
  message: string;
  type: string;
}[] = [];

test.describe('Navigation to sections', () => {
  test.beforeEach(async ({ page, welcomePage, baseUrl }) => {
    page.on('console', (msg) => {
      if (msg.type() == 'error') {
        logs.push({ message: msg.text(), type: msg.type() });
      }
    });
    await welcomePage.openWelcomePage(baseUrl);
  });

  test('Navigation to Account - No errors ', async ({
    welcomePage,
    baseUrl,
    page
  }) => {
    await welcomePage.openTab(SectionsLinks.ACCOUNT);
    expect(page.url()).toBe(`${baseUrl}/account.html`);
    expect(logs.length).toBe(0);
  });

  test('Navigation to Clothing - No errors ', async ({
    welcomePage,
    baseUrl,
    page
  }) => {
    await welcomePage.openTab(SectionsLinks.CLOTHING);
    expect(page.url()).toBe(`${baseUrl}/products.html`);
    expect(logs.length).toBe(0);
  });

  test('Navigation to Shopping Bag - No errors ', async ({
    welcomePage,
    baseUrl,
    page
  }) => {
    await welcomePage.openTab(SectionsLinks.SHOPPINGBAG);
    expect(page.url()).toBe(`${baseUrl}/cart.html`);
    expect(logs.length).toBe(0);
  });

  test('Navigation to About - No errors ', async ({
    welcomePage,
    baseUrl,
    page
  }) => {
    await welcomePage.openTab(SectionsLinks.ABOUT);
    expect(page.url()).toBe(`${baseUrl}/about.html`);
    expect(logs.length).toBe(0);
  });

  test('Navigation to Home - No errors ', async ({
    welcomePage,
    baseUrl,
    page
  }) => {
    await welcomePage.openTab(SectionsLinks.HOME);
    expect(page.url()).toContain(`${baseUrl}`);
    expect(logs.length).toBe(0);
  });
});
