import { test as baseTest } from '@playwright/test';
import WelcomePage from 'page_objects/welcome_page';

export type AriaRole =
  | 'button'
  | 'textbox'
  | 'generic'
  | 'heading'
  | 'alert'
  | 'alertdialog'
  | 'application'
  | 'article'
  | 'banner'
  | 'blockquote'
  | 'caption'
  | 'cell'
  | 'checkbox'
  | 'columnheader'
  | 'combobox'
  | 'complementary'
  | 'contentinfo'
  | 'definition'
  | 'deletion'
  | 'dialog';

type pages = {
  welcomePage: WelcomePage;
};

export type TestOrganizationParameters = {
  welcomePageUrl: string;
};

const testPages = baseTest.extend<pages, TestOrganizationParameters>({
  // Define a default value.
  // We can later override it in the config.

  welcomePageUrl: [
    'https://personal-plan.stg.koa.care',
    {
      option: true,
      scope: 'worker',
    },
  ],


  welcomePage: async ({ page }, use) => {
    await use(new WelcomePage(page));
  },
});

export const test = testPages;
