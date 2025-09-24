import { expect, Page } from '@playwright/test';
import { AriaRole } from 'fixtures/base_test';

export const testHistoryButton = {
  id: 'menu-item-10284'
};

export default class WelcomePage {
  public constructor(public page: Page) {}

  public async clickTestHistoryButton(): Promise<void> {
    await this.page
      .getByTestId(testHistoryButton.id)
      .click();
  }

  public async openWelcomePage(host: string): Promise<void> {
    await this.page.goto(host);
  }
}
