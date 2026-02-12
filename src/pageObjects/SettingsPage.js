const { expect } = require('@playwright/test');

class SettingsPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Verifies that a profile field label is visible and has the expected value
   * @param {string} fieldName - The field label (e.g., "Full Name", "Email")
   * @param {string} expectedValue - The expected value for the field
   */
  async verifyProfileField(fieldName, expectedValue) {
    await this.page.waitForTimeout(1000);
    
    // Special case: "Title" field - only verify the value exists, not the label
    if (fieldName === 'Title') {
      const titleLocator = this.page.locator(`//h6[normalize-space()='${expectedValue}']`);
      await expect(titleLocator).toBeVisible();
      return;
    }

    // For other fields: verify both label and value
    // Wait for the field label to be visible
    const fieldLabelLocator = this.page.locator(
      `//span[normalize-space()='${fieldName}:']`
    );
    await expect(fieldLabelLocator).toBeVisible();

    // Get the value element (next h6 sibling after the label)
    const fieldValueLocator = this.page.locator(
      `//span[normalize-space()='${fieldName}:']/following::h6[1]`
    );
    await expect(fieldValueLocator).toHaveText(expectedValue);
  }

  /**
   * Verifies multiple profile fields from a data table
   * @param {Array} dataTable - Array of objects with Field and Value properties
   */
  async verifyProfileDetails(dataTable) {
    for (const row of dataTable) {
      await this.verifyProfileField(row.Field, row.Value);
    }
  }

  /**
   * Verifies multiple profile fields from a data table with dynamic values
   * @param {Array} dataTable - Array of objects with Field and Value properties
   * @param {Object} dynamicValues - Object containing generated values (e.g., { phoneNumber, department })
   */
  async verifyProfileDetailsWithDynamicValues(dataTable, dynamicValues) {
    for (const row of dataTable) {
      let valueToVerify = row.Value;
      
      // Replace dynamic placeholders with actual generated values
      if (row.Field === 'Phone Number' && dynamicValues.phoneNumber) {
        valueToVerify = dynamicValues.phoneNumber;
      } else if (row.Field === 'Department' && dynamicValues.department) {
        valueToVerify = dynamicValues.department;
      }
      
      await this.verifyProfileField(row.Field, valueToVerify);
    }
  }

  /**
   * Clicks a button by its text on the profile drawer
   * @param {string} buttonText - The text of the button to click
   */
  async clickButtonByText(buttonText) {
    await this.page.waitForTimeout(1000);
    const buttonLocator = this.page.locator(`//button[normalize-space()='${buttonText}']`);
    await buttonLocator.click();
  }

  /**
   * Verifies that a modal with the given title is visible
   * @param {string} modalTitle - The title text of the modal
   */
  async verifyModalVisible(modalTitle) {
    await this.page.waitForTimeout(1000);
    const modalTitleLocator = this.page.locator(`//h3[text()='${modalTitle}']`);
    await expect(modalTitleLocator).toBeVisible();
  }

  /**
   * Verifies that a specific input field is disabled
   * @param {string} fieldName - The name attribute of the input field
   */
  async verifyFieldDisabled(fieldName) {
    await this.page.waitForTimeout(1000);
    const fieldLocator = this.page.locator(`input[name="${fieldName}"]`);
    await expect(fieldLocator).toBeDisabled();
  }

  /**
   * Verifies that a field is disabled and has a specific value
   * @param {string} fieldLabel - The label text of the field (e.g., "User Role", "Email Address")
   * @param {string} expectedValue - The expected value in the field
   */
  async verifyFieldDisabledWithValue(fieldLabel, expectedValue) {
    await this.page.waitForTimeout(500);
    
    // Special handling for Email Address field
    if (fieldLabel === 'Email Address') {
      const inputLocator = this.page.locator('input[placeholder="name@company.com"]');
      await expect(inputLocator).toBeVisible();
      await expect(inputLocator).toBeDisabled();
      await expect(inputLocator).toHaveValue(expectedValue);
      return;
    }
    
    // Special handling for User Role field (button element)
    if (fieldLabel === 'User Role') {
      // Find the div inside the User Role button with the role value
      const roleValueLocator = this.page.locator(`//button[@id='select:_r_p_:trigger']//div[text()='${expectedValue}']`);
      await expect(roleValueLocator).toBeVisible();
      return;
    }
    
    // For other fields, find by value attribute
    const inputLocator = this.page.locator(`input[value="${expectedValue}"]`);
    await expect(inputLocator).toBeVisible();
    await expect(inputLocator).toBeDisabled();
    await expect(inputLocator).toHaveValue(expectedValue);
  }

  /**
   * Selects a country from the phone number dropdown
   * @param {string} countryCode - The country code (e.g., "PK", "US", "UK", "CA")
   */
  async selectCountryInPhoneDropdown(countryCode) {
    await this.page.waitForTimeout(500);
    
    // Click the country selector button
    const countrySelectorButton = this.page.locator('button[aria-label="Country selector"]');
    await countrySelectorButton.click();
    
    // Wait for the listbox to appear and select the country (li element specifically)
    await this.page.waitForTimeout(500);
    const countryOption = this.page.locator(`[role="listbox"] li[data-country="${countryCode.toLowerCase()}"]`);
    await countryOption.click();
  }

  /**
   * Enters a random phone number in the phone number field, typing digit by digit
   * Phone number format: 10 digits starting with 33 (e.g., 3312345678)
   * @returns {string} The generated phone number
   */
  async enterRandomPhoneNumber() {
    await this.page.waitForTimeout(500);
    
    // Generate a random 10-digit phone number that starts with 333
    const remainingDigits = Math.floor(1000000 + Math.random() * 9000000); // 7 digits (1000000-9999999)
    const randomNumber = `333${remainingDigits}`;
    
    const phoneInput = this.page.locator('input[type="tel"]');
  
    // Wait for input and focus
    await phoneInput.waitFor({ state: 'visible' });
    await phoneInput.click();
  
    // Move cursor to end of existing value (+92)
    await phoneInput.press('End');
  
    // Type random digits digit by digit
    await phoneInput.type(String(randomNumber), { delay: 50 });
  
    return `+92${randomNumber}`;
  }
  
  

  /**
   * Clicks on the Designation dropdown
   */
  async clickDesignationDropdown() {
    await this.page.waitForTimeout(500);
    const designationDropdown = this.page.locator('div[aria-label="designation"] button[role="combobox"]');
    await designationDropdown.click();
  }

  /**
   * Selects a designation from the dropdown
   * @param {string} designation - The designation text to select (e.g., "Site Manager", "Asset Manager")
   */
  async selectDesignation(designation) {
    await this.page.waitForTimeout(500);
    const designationOption = this.page.locator(`(//div[contains(text(),'${designation}')])[1]`);
    await designationOption.click();
  }

  /**
   * Enters a department name with a random 2-digit number
   * @param {string} departmentBase - The base department name (e.g., "Automation")
   * @returns {string} The full department name with random number
   */
  async enterDepartmentWithRandomNumber(departmentBase) {
    await this.page.waitForTimeout(500);
    
    // Generate a random 2-digit number (10-99)
    const randomNumber = Math.floor(Math.random() * 90) + 10;
    const fullDepartmentName = `${departmentBase}${randomNumber}`;
    
    const departmentInput = this.page.locator('input[name="department"]');
    await departmentInput.fill(fullDepartmentName);
    
    return fullDepartmentName;
  }

  /**
   * Clicks a button on the profile modal by its text
   * @param {string} buttonText - The text of the button to click
   */
  async clickModalButton(buttonText) {
    await this.page.waitForTimeout(500);
    const button = this.page.locator(`//button[text()="${buttonText}"]`);
    await button.click();
  }

  /**
   * Verifies that a success message is visible
   * @param {string} message - The success message text to verify
   */
  async verifySuccessMessage(message) {
    await this.page.waitForTimeout(500);
    const successMessageLocator = this.page.locator(`//div[contains(text(),'${message}')]`);
    await expect(successMessageLocator).toBeVisible();
  }

  /**
   * Clicks on a tab by its text
   * @param {string} tabName - The name of the tab to click
   */
  async clickTab(tabName) {
    await this.page.waitForTimeout(500);
    const tabButton = this.page.locator(`//button[normalize-space()='${tabName}']`);
    await tabButton.click();
  }

  /**
   * Verifies that multiple overview metrics are visible
   * @param {Array} metrics - Array of metric names to verify
   */
  async verifyOverviewMetrics(metrics) {
    await this.page.waitForTimeout(500);
    
    for (const metric of metrics) {
      const metricLocator = this.page.locator(`//span[normalize-space()='${metric}']`);
      await expect(metricLocator).toBeVisible();
    }
  }
}

module.exports = { SettingsPage };
