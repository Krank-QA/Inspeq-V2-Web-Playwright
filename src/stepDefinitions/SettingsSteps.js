const { When, Then } = require('@cucumber/cucumber');
const { SettingsPage } = require('../pageObjects/SettingsPage');

Then('I should see following details in Profile drawer', async function (dataTable) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;

  // Convert the data table to an array of objects
  // hashes() returns an array like: [{Field: "Title", Value: "KAutomation"}, ...]
  const profileData = dataTable.hashes();

  // Check if the data table contains <generated> placeholder
  const hasGeneratedPlaceholder = profileData.some(row => row.Value === '<generated>');
  
  // Only use dynamic values if <generated> placeholder is present
  if (hasGeneratedPlaceholder && (this.generatedPhoneNumber || this.generatedDepartment)) {
    // Use dynamic values verification
    const dynamicValues = {
      phoneNumber: this.generatedPhoneNumber,
      department: this.generatedDepartment
    };
    await settingsPage.verifyProfileDetailsWithDynamicValues(profileData, dynamicValues);
  } else {
    // Use static values verification
    await settingsPage.verifyProfileDetails(profileData);
  }
});

When('I click on {string} button on profile drawer', async function (buttonText) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.clickButtonByText(buttonText);
});

Then('I should see {string} modal', async function (modalTitle) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.verifyModalVisible(modalTitle);
});

Then('I should see Email Address field disabled and value should be {string}', async function (expectedValue) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.verifyFieldDisabledWithValue('Email Address', expectedValue);
});

Then('I should see User Role field disabled with value {string}', async function (expectedValue) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.verifyFieldDisabledWithValue('User Role', expectedValue);
});

Then('I should see User Role field with value {string}', async function (expectedValue) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.verifyFieldWithValue('User Role', expectedValue);
});

When('I select {string} as country in phone number dropdown', async function (countryCode) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.selectCountryInPhoneDropdown(countryCode);
});

When('I select {string} as country in phone number dropdown on general settings screen', async function (countryCode) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.selectCountryOnGeneralSettings(countryCode);
});

When('I enter Random number in the phone number field', async function () {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  const generatedPhoneNumber = await settingsPage.enterRandomPhoneNumber();
  // Store the generated phone number for later verification if needed
  this.generatedPhoneNumber = generatedPhoneNumber;
});

When('I click on Designation dropdown', async function () {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.clickDesignationDropdown();
});

When('I select {string} as designation in dropdown', async function (designation) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.selectDesignation(designation);
});

When('I enter {string} in department field', async function (departmentBase) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  const fullDepartment = await settingsPage.enterDepartmentWithRandomNumber(departmentBase);
  // Store the generated department name for later verification if needed
  this.generatedDepartment = fullDepartment;
});

  When('I click on {string} button on modal', async function (buttonText) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.clickModalButton(buttonText);
});

Then('I should see {string} success message', async function (message) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.verifySuccessMessage(message);
});

When('I click on {string} tab', async function (tabName) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.clickTab(tabName);
});

Then('the following overview metrics should be visible:', async function (dataTable) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  
  // Extract metric names from the data table (single column)
  const metrics = dataTable.raw().flat(); // Flatten the array to get all metric names
  
  // Verify all metrics are visible
  await settingsPage.verifyOverviewMetrics(metrics);
});

Then('I should see {string} Heading', async function (screenTitle) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.verifyScreenTitle(screenTitle);
});

When('I click on Industry dropdown', async function () {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.clickIndustryDropdown();
});

Then('I should see following industries in dropdown', async function (dataTable) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  
  // Extract industry names from the data table (single column)
  const industries = dataTable.raw().flat(); // Flatten the array to get all industry names
  
  // Verify all industries are visible in dropdown
  await settingsPage.verifyIndustriesInDropdown(industries);
});

When('I select {string} as industry in dropdown', async function (industry) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.selectIndustry(industry);
});

When('I enter {string} in organization email field', async function (emailBase) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  const fullEmail = await settingsPage.enterOrganizationEmailWithRandomNumber(emailBase);
  // Store the generated email for later verification if needed
  this.generatedOrgEmail = fullEmail;
});

When('I wait for {int} seconds', async function (seconds) {
  await this.page.waitForTimeout(seconds * 1000);
});

When('I click on the {string} button', async function (buttonText) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.clickButton(buttonText);
});

When('I click on {string} tab button', async function (tabName) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.clickTabButton(tabName);
});

When('I click on {string} user', async function (userEmail) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.clickUser(userEmail);
});

When('I click on {string} button on users screen', async function (buttonText) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.clickButtonByText(buttonText);
});

When('I enter {string} in the full name field on modal', async function (fullName) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.enterFullNameOnModal(fullName);
});

When('I enter {string} in the email field on modal', async function (email) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.enterEmailOnModal(email);
});

When('I click on Add Role dropdown', async function () {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.clickAddRoleDropdown();
});

When('I select {string} as role in dropdown', async function (role) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.selectRole(role);
});

