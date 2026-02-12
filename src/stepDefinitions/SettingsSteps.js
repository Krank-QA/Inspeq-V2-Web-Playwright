const { When, Then } = require('@cucumber/cucumber');
const { SettingsPage } = require('../pageObjects/SettingsPage');

Then('I should see following details in Profile drawer', async function (dataTable) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;

  // Convert the data table to an array of objects
  // hashes() returns an array like: [{Field: "Title", Value: "KAutomation"}, ...]
  const profileData = dataTable.hashes();

  // Check if we have any dynamic values stored (phone number, department)
  const hasDynamicValues = this.generatedPhoneNumber || this.generatedDepartment;
  
  if (hasDynamicValues) {
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

// Then('Email Address field should be disabled', async function () {
//   const settingsPage = this.settingsPage || new SettingsPage(this.page);
//   this.settingsPage = settingsPage;
//   await settingsPage.verifyFieldDisabled('email');
// });

Then('I should see Email Address field disabled and value should be {string}', async function (expectedValue) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.verifyFieldDisabledWithValue('Email Address', expectedValue);
});

Then('I should see User Role field disabled and value should be {string}', async function (expectedValue) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.verifyFieldDisabledWithValue('User Role', expectedValue);
});

Then('I should see User Role field value should be {string}', async function (expectedValue) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.verifyFieldDisabledWithValue('User Role', expectedValue);
});

When('I select {string} as country in phone number dropdown', async function (countryCode) {
  const settingsPage = this.settingsPage || new SettingsPage(this.page);
  this.settingsPage = settingsPage;
  await settingsPage.selectCountryInPhoneDropdown(countryCode);
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

When('I click on {string} button on profile modal', async function (buttonText) {
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
