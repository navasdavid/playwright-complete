import { expect, Locator, Page } from '@playwright/test';

const logoutButton = {
  name: 'Logout'
};

export default class AccountPage {
  public constructor(public page: Page) {}

  public async isLogOutButtonShown(): Promise<boolean> {
    return this.page.getByRole('button', { name: logoutButton.name }) != null;
  }
}
