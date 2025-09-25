import { Page } from '@playwright/test';

const userNameInput = {
  id: 'username'
};

const passwordInput = {
  id: 'password'
};

const loginButton = {
  name: 'Login'
};

export default class LoginPage {
  public constructor(public page: Page) {}

  public async doLogin(email: string, password: string): Promise<void> {
    await this.page.getByTestId(userNameInput.id).fill(email);
    await this.page.getByTestId(passwordInput.id).fill(password);
    await this.page.getByRole('button', { name: loginButton.name }).click();
  }

  public async openLoginPage(baseUrl: string): Promise<void> {
    await this.page.goto(baseUrl + '/login');
  }
}
