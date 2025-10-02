import { Page } from '@playwright/test';

export enum SectionsLinks {
  HOME = 'Home',
  ACCOUNT = 'Account',
  CLOTHING = 'Clothing',
  SHOPPINGBAG = 'Shopping bag',
  ABOUT = 'About'
}

export default class HomePage {
  public constructor(public page: Page) {}

  public async openWelcomePage(host: string): Promise<void> {
    await this.page.goto(host);
  }

  public async openTab(tabName: SectionsLinks): Promise<void> {
    await this.page.getByRole('link', { name: tabName }).click();
  }
}
