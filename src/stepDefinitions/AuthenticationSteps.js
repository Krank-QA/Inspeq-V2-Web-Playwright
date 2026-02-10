const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../pageObjects/AuthenticationPage');

Given('I navigate to the login page', async function () {
  const username = process.env.AUTH_USERNAME;
  const password = process.env.AUTH_PASSWORD;
  const host = process.env.APP_HOST;
  const path = process.env.LOGIN_PATH || '/en/login';

  if (!username || !password || !host) {
    throw new Error(
      'Missing required environment variables. Please set AUTH_USERNAME, AUTH_PASSWORD and APP_HOST in your .env file.'
    );
  }

  const encodedUser = encodeURIComponent(username);
  const encodedPass = encodeURIComponent(password);

  const url = `https://${encodedUser}:${encodedPass}@${host}${path}`;

  await this.page.goto(url);

  // Ensure a single LoginPage instance is created and stored on the world
  const loginPage = this.loginPage || new LoginPage(this.page);
  this.loginPage = loginPage;

  // Explicitly wait up to 5 seconds for the login heading to be visible
  await this.page.waitForSelector('//h2[text()="Welcome Back"]', {
    state: 'visible',
    timeout: 5000,
  });
  await loginPage.assertHeading('Welcome Back');
});

When('I enter {string} in the email field', async function (email) {
  const loginPage = this.loginPage || new LoginPage(this.page);
  this.loginPage = loginPage;
  await loginPage.enterEmail(email);
});

When('I enter {string} in the password field', async function (password) {
  const loginPage = this.loginPage || new LoginPage(this.page);
  this.loginPage = loginPage;
  await loginPage.enterPassword(password);

});

When('I click on {string} button', async function (buttonText) {
  const loginPage = this.loginPage || new LoginPage(this.page);
  this.loginPage = loginPage;
  await loginPage.clickButtonByText(buttonText);
});

Then('I should see {string} screen', async function (screenTitle) {
  const loginPage = this.loginPage || new LoginPage(this.page);
  this.loginPage = loginPage;
  await loginPage.assertScreenTitle(screenTitle);
});

When('I click on {string} organization', async function (orgName) {
  const loginPage = this.loginPage || new LoginPage(this.page);
  this.loginPage = loginPage;
  await loginPage.clickOrganization(orgName);
});

Then('I should see {string} title screen', async function (titleText) {
  const loginPage = this.loginPage || new LoginPage(this.page);
  this.loginPage = loginPage;
  await loginPage.assertTitleSpan(titleText);
});

When('I click on profile icon', async function () {
  const loginPage = this.loginPage || new LoginPage(this.page);
  this.loginPage = loginPage;
  await loginPage.clickProfileIcon();
});

When('I click on {string} option from the dropdown', async function (optionText) {
  const loginPage = this.loginPage || new LoginPage(this.page);
  this.loginPage = loginPage;
  await loginPage.clickDropdownOption(optionText);
});

Then('I should see login page', async function () {
  const loginPage = this.loginPage || new LoginPage(this.page);
  this.loginPage = loginPage;
  await loginPage.assertHeading('Welcome Back');
});

Then('I should see {string} error message', async function (errorMessage) {
  const loginPage = this.loginPage || new LoginPage(this.page);
  this.loginPage = loginPage;
  await loginPage.assertErrorMessage(errorMessage);
});

Then('I should see {string} validation message', async function (validationMessage) {
  const loginPage = this.loginPage || new LoginPage(this.page);
  this.loginPage = loginPage;
  await loginPage.assertValidationMessage(validationMessage);
});


