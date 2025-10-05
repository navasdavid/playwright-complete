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

// In CI the email and password should be passed as environment variables for security reasons, using a secret for the password
const email = process.env['email'] || 'demouser';
const password = process.env['password'] || 'fashion123';

export default class LoginPage {
  public constructor(public page: Page) {}

  public async doLogin(): Promise<void> {
    await this.page.getByTestId(userNameInput.id).fill(email);
    await this.page.getByTestId(passwordInput.id).fill(password);
    await this.page.getByRole('button', { name: loginButton.name }).click();
  }

  public async openLoginPage(baseUrl: string): Promise<void> {
    await this.page.goto(baseUrl + '/login');
  }
}
