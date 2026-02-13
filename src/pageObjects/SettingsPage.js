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
      if (row.Value === '<generated>') {
        if (row.Field === 'Phone Number' && dynamicValues.phoneNumber) {
          valueToVerify = dynamicValues.phoneNumber;
        } else if (row.Field === 'Department' && dynamicValues.department) {
          valueToVerify = dynamicValues.department;
        }
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
      // Find the button with role combobox that contains the expected value
      const roleValueLocator = this.page.locator(`//button[@role='combobox']//div[text()='${expectedValue}']`);
      await expect(roleValueLocator).toBeVisible();
      return;
    }
    
    // For other fields, find by value attribute
    const inputLocator = this.page.locator(`input[value="${expectedValue}"]`);
    await expect(inputLocator).toBeVisible();
    await expect(inputLocator).toBeDisabled();
    await expect(inputLocator).toHaveValue(expectedValue);
  }

  async verifyFieldWithValue(fieldLabel, expectedValue) {
    await this.page.waitForTimeout(500);
    
    // Special handling for Email Address field
    if (fieldLabel === 'Email Address') {
      const inputLocator = this.page.locator('input[placeholder="name@company.com"]');
      await expect(inputLocator).toBeVisible();
      await expect(inputLocator).toHaveValue(expectedValue);
      return;
    }
    
    // Special handling for User Role field (button element)
    if (fieldLabel === 'User Role') {
      // Find the button with role combobox that contains the expected value
      const roleValueLocator = this.page.locator(`//button[@role='combobox']//div[text()='${expectedValue}']`);
      await expect(roleValueLocator).toBeVisible();
      return;
    }
    
    // For other fields, find by value attribute
    const inputLocator = this.page.locator(`input[value="${expectedValue}"]`);
    await expect(inputLocator).toBeVisible();
    await expect(inputLocator).toHaveValue(expectedValue);
  }

 


  /**
   * Selects a country from the phone number dropdown
   * @param {string} countryCode - The country code (e.g., "PK", "US", "UK", "CA")
   */
  async selectCountryInPhoneDropdown(countryCode) {
    await this.page.waitForTimeout(500);
    
    // Click the country selector button
    const countrySelectorButton = this.page.locator("(//div[@role='dialog']//button[@aria-label='Country selector'])[1]");
    await countrySelectorButton.click();
    
    // Wait for the listbox to appear and select the country (li element specifically)
    await this.page.waitForTimeout(500);
    const countryOption = this.page.locator(`(//div[@role='dialog']//ul[@role='listbox']//li[@data-country='${countryCode.toLowerCase()}'])[1]`);
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
    
    // Use more specific locator to target the phone input in the dialog
    const phoneInput = this.page.locator("(//div[@role='dialog']//input[@type='tel'])[1]");
  
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
    // Wait a bit for the toast to appear
    await this.page.waitForTimeout(500);
    
    // Use a flexible locator that works with toast messages
    const successMessageLocator = this.page.locator(`//div[@data-scope='toast']//div[@data-part='title' and contains(text(),'${message}')]`);
    
    // Wait for the toast to appear with a longer timeout
    await successMessageLocator.waitFor({ state: 'visible', timeout: 15000 });
    
    // Verify it's visible
    await expect(successMessageLocator).toBeVisible({ timeout: 5000 });
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

  /**
   * Verifies that a screen title is visible
   * @param {string} screenTitle - The screen title text to verify (e.g., "Organization Details")
   */
  async verifyScreenTitle(screenTitle) {
    await this.page.waitForTimeout(500);
    const screenTitleLocator = this.page.locator(`//h5[normalize-space()='${screenTitle}']`);
    await expect(screenTitleLocator).toBeVisible();
  }

  /**
   * Clicks on the Industry dropdown
   */
  async clickIndustryDropdown() {
    await this.page.waitForTimeout(500);
    const industryDropdown = this.page.locator("//button[@role='combobox' and .//div[normalize-space()='Mining']]");
    await industryDropdown.click();
  }

  /**
   * Verifies that multiple industries are present in the dropdown
   * @param {Array} industries - Array of industry names to verify
   */
  async verifyIndustriesInDropdown(industries) {
    await this.page.waitForTimeout(500);
    
    for (const industry of industries) {
      const industryOption = this.page.locator(`//div[@role='option' and normalize-space()='${industry}']`);
      // Check if element is attached to DOM (exists) rather than visible
      await expect(industryOption).toBeAttached();
    }
  }


  /**
   * Selects an industry from the dropdown
   * @param {string} industry - The industry name to select (e.g., "Healthcare", "Manufacturing")
   */
  async selectIndustry(industry) {
    await this.page.waitForTimeout(500);
    const industryOption = this.page.locator(`//div[@role='option' and normalize-space()='${industry}']`);
    await industryOption.click();
  }

  /**
   * Enters an organization email with a random 2-digit number
   * @param {string} emailBase - The base email (e.g., "TestAutomation@krank.com")
   * @returns {string} The full email with random number inserted before @
   */
  async enterOrganizationEmailWithRandomNumber(emailBase) {
    await this.page.waitForTimeout(500);
    
    // Generate a random 2-digit number (10-99)
    const randomNumber = Math.floor(Math.random() * 90) + 10;
    
    // Split email at @ and insert random number before @
    const emailParts = emailBase.split('@');
    const fullEmail = `${emailParts[0]}${randomNumber}@${emailParts[1]}`;
    
    const emailInput = this.page.locator('input[name="email"]');
    await emailInput.fill(fullEmail);
    
    return fullEmail;
  }

  /**
   * Clicks a button by its text with multiple fallback strategies
   * @param {string} buttonText - The text of the button to click (e.g., "Update Details")
   */
  async clickButton(buttonText) {
    await this.page.waitForTimeout(1000);
    
    const button = this.page.locator(`//button[@type='submit' and normalize-space()='${buttonText}']`);
    
    // Wait for button to be visible
    await button.waitFor({ state: 'visible', timeout: 5000 });
    
    // Scroll into view
    await button.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
    
    console.log(`Attempting to click button: "${buttonText}"`);
    
    // Use JavaScript to dispatch real mouse events and click
    await button.evaluate((el) => {
      // Dispatch mousedown event
      el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
      
      // Dispatch mouseup event
      el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
      
      // Dispatch click event
      el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      
      // Also trigger the actual click
      el.click();
    });
    
    console.log(`Button click events dispatched: "${buttonText}"`);
    
    // Wait for any potential navigation or state changes
    await this.page.waitForTimeout(2000);
  }

  /**
   * Clicks on a tab button by its name
   * @param {string} tabName - The tab name to click (e.g., "Users", "General", "Roles")
   */
  async clickTabButton(tabName) {
    await this.page.waitForTimeout(500);
    const tabButton = this.page.locator(`(//button[@role='tab' and normalize-space()='${tabName}'])[1]`);
    await tabButton.waitFor({ state: 'visible', timeout: 5000 });
    await tabButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Clicks on a user row by email address
   * @param {string} userEmail - The user email to click (e.g., "shaheer.k@krank.com")
   */
  async clickUser(userEmail) {
    await this.page.waitForTimeout(2000);
    
    // Wait for the table body to be loaded
    await this.page.locator('tbody tr').first().waitFor({ state: 'visible', timeout: 10000 });
    
    // Find and click the user row containing the email
    const userRow = this.page.locator(`//span[@data-scope='tooltip' and normalize-space()='${userEmail}']`);    
    await userRow.waitFor({ state: 'visible', timeout: 5000 });
    await userRow.scrollIntoViewIfNeeded();
    await userRow.dblclick();
    
    await this.page.waitForTimeout(1000);
  }

  /**
   * Enters full name in the modal
   * @param {string} fullName - The full name to enter
   */
  async enterFullNameOnModal(fullName) {
    await this.page.waitForTimeout(500);
    const fullNameInput = this.page.locator("//input[@placeholder='Enter Full Name']");
    await fullNameInput.fill(fullName);
  }

  /**
   * Enters email in the modal
   * @param {string} email - The email to enter
   */
  async enterEmailOnModal(email) {
    await this.page.waitForTimeout(500);
    const emailInput = this.page.locator("//input[@placeholder='name@company.com']");
    await emailInput.fill(email);
  }

  /**
   * Clicks on Add Role dropdown
   */
  async clickAddRoleDropdown() {
    await this.page.waitForTimeout(500);
    const roleDropdown = this.page.locator("//span[@data-scope='select' and .//div[normalize-space()='Select Domain']]");
    await roleDropdown.click();
  }

  /**
   * Selects a role from the dropdown
   * @param {string} role - The role to select (e.g., "Admin", "User")
   */
  async selectRole(role) {
    await this.page.waitForTimeout(500);
    const roleOption = this.page.locator(`(//div[@role='option' and normalize-space()='${role}'])[2]`);
    await roleOption.click();
  }
}

module.exports = { SettingsPage };
