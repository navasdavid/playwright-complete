import { Page } from '@playwright/test';

export const testHistoryButton = {
  id: 'menu-item-10284'
};

export enum SectionsLinks {
  HOME = 'Home',
  ACCOUNT = 'Account',
  CLOTHING = 'Clothing',
  SHOPPINGBAG = 'Shopping bag',
  ABOUT = 'About'
}

const accountButton = {
  name: 'Account'
};

export default class WelcomePage {
  public constructor(public page: Page) {}

  public async openWelcomePage(host: string): Promise<void> {
    await this.page.goto(host);
  }

  public async openTab(tabName: SectionsLinks): Promise<void> {
    await this.page.getByRole('link', { name: tabName }).click();
  }
}
