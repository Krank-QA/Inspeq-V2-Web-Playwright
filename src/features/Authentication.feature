Feature: Login

  Scenario: User should be Login with valid credentials
    Given I navigate to the login page
    When I enter "kautomation@krank-automation.com" in the email field
    And I enter "Super@dmin1" in the password field
    And I click on "Log in" button
    Then I should see "Select Organizations" screen
    When I click on "Automation Org" organization
    And I click on "Continue" button
    Then I should see "Dashboard" title screen 

  Scenario: User should be able to logout
    Given I navigate to the login page
    When I enter "kautomation@krank-automation.com" in the email field
    And I enter "Super@dmin1" in the password field
    And I click on "Log in" button
    Then I should see "Select Organizations" screen
    When I click on "Automation Org" organization
    And I click on "Continue" button
    Then I should see "Dashboard" title screen
    When I click on profile icon
    And I click on "Sign Out" option from the dropdown
    Then I should see login page

  Scenario: User should not be able to login with invalid email
    Given I navigate to the login page
    When I enter "test@test.com" in the email field
    And I enter "Super@dmin1" in the password field
    And I click on "Log in" button
    Then I should see "Invalid email or password." error message

  Scenario: User should not be able to login with invalid password
    Given I navigate to the login page
    When I enter "kautomation@krank-automation.com" in the email field
    And I enter "testing12345" in the password field
    And I click on "Log in" button
    Then I should see "Invalid email or password." error message

  Scenario: User should see Enter valid email validation message
    Given I navigate to the login page
    When I enter "12345" in the email field
    Then I should see "Please enter a valid email address." validation message

  Scenario: User should see Password must be atleast 8 characters long validation message
    Given I navigate to the login page
    When I enter "12345" in the password field
    Then I should see "Password must be at least 8 characters long." validation message