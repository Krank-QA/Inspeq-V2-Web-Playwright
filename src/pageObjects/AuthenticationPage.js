class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async assertHeading(text) {
    // Assert the Welcome Back heading (or any given text) is visible
    await this.page.waitForSelector(`//h2[text()='${text}']`, {
      state: 'visible',
    });
  }

  async enterEmail(email) {
    await this.page.fill('input[name="email"]', email);
  }

  async enterPassword(password) {
    await this.page.fill('input[name="password"]', password);
  }

  async clickButtonByText(buttonText) {
    // Currently used for the Log in submit button
    await this.page.click('button[type="submit"]');
  }

  async assertScreenTitle(titleText) {
    await this.page.waitForSelector(`//h2[normalize-space()='${titleText}']`, {
      state: 'visible',
    });
  }

  async assertTitleSpan(titleText) {
    await this.page.waitForSelector(`//span[normalize-space()='${titleText}']`, {
      state: 'visible',
    });
  }

  async clickOrganization(name) {
    await this.page.click(`//span[normalize-space()='${name}']`);
  }

  async clickProfileIcon() {
    await this.page.click('div[data-scope="avatar"][data-part="root"]');
  }

  async clickDropdownOption(optionText) {
    await this.page.click(`//h6[normalize-space()='${optionText}']`);
  }

  async assertErrorMessage(message) {
    await this.page.waitForSelector(`//p[normalize-space()='${message}']`, {
      state: 'visible',
    });
  }

  async assertValidationMessage(message) {
    await this.page.waitForSelector(`//span[normalize-space()='${message}']`, {
      state: 'visible',
    });
  }
}

module.exports = { LoginPage };

