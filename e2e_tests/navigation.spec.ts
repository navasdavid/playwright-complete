import { expect } from '@playwright/test';
import { test } from '../fixtures/base_test';
import { SectionsLinks } from 'page_objects/home_page';

const logs: {
  message: string;
  type: string;
}[] = [];

test.describe('Navigation to sections', () => {
  test.beforeEach(async ({ page, homePage, baseUrl }) => {
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
    expect(page.url(), `Incorrect URL for account section: ${page.url()}`).toBe(
      `${baseUrl}/account.html`
    );
    expect(
      logs.length,
      `Some errors found in console for Account section`
    ).toBe(0);
  });

  test('Navigation to Clothing - No console errors ', async ({
    homePage,
    baseUrl,
    page
  }) => {
    await homePage.openTab(SectionsLinks.CLOTHING);
    expect(
      page.url(),
      `Incorrect URL for Clothing section: ${page.url()}`
    ).toBe(`${baseUrl}/products.html`);
    expect(
      logs.length,
      `Some errors found in console for Clothing section`
    ).toBe(0);
  });

  test('Navigation to Shopping Bag - No console errors ', async ({
    homePage,
    baseUrl,
    page
  }) => {
    await homePage.openTab(SectionsLinks.SHOPPINGBAG);
    expect(
      page.url(),
      `Incorrect URL for Shopping section: ${page.url()}`
    ).toBe(`${baseUrl}/cart.html`);
    expect(
      logs.length,
      `Some errors found in console for Shopping Bag section`
    ).toBe(0);
  });

  test('Navigation to About - No console errors ', async ({
    homePage,
    baseUrl,
    page
  }) => {
    await homePage.openTab(SectionsLinks.ABOUT);
    expect(page.url(), `Incorrect URL for About section: ${page.url()}`).toBe(
      `${baseUrl}/about.html`
    );
    expect(
      logs.length,
      `Some errors found in console for About section: ${page.url()}`
    ).toBe(0);
  });

  test('Navigation to Home - No console errors ', async ({
    homePage,
    baseUrl,
    page
  }) => {
    await homePage.openTab(SectionsLinks.HOME);
    expect(page.url(), `Incorrect URL for Home section: ${page.url()}`).toBe(
      `${baseUrl}/`
    );
    expect(
      logs.length,
      `Some errors found in console for Home Bag section`
    ).toBe(0);
  });
});
