Feature: Profile and Organization Settings

  Scenario: User should be able to Edit Profile Settings
    Given I navigate to the login page
    When I enter "kautomation@krank-automation.com" in the email field
    And I enter "Super@dmin1" in the password field
    And I click on "Log in" button
    Then I should see "Select Organizations" screen
    When I click on "Automation Org" organization
    And I click on "Continue" button
    Then I should see "Dashboard" title screen
    When I click on profile icon
    And I click on "Profile Settings" option from the dropdown
    Then I should see following details in Profile drawer
        | Field      | Value                             |
        | Title      | KAutomation                       |  
        | Full Name  | KAutomation                       |  
        | Email      | kautomation@krank-automation.com  |  
        | Role       | Admin                             |
    When I click on "Edit Profile" button on profile drawer
    Then I should see "Edit User" modal
    And I should see Email Address field disabled and value should be "kautomation@krank-automation.com"
    And I should see User Role field value should be "Admin"
    When I select "PK" as country in phone number dropdown  
    And I enter Random number in the phone number field
    And I click on Designation dropdown
    And I select "Site Manager" as designation in dropdown
    And I enter "Automation" in department field
    And I click on "Update User" button on profile modal
    Then I should see "Successfully updated user" success message 
    And I should see following details in Profile drawer
        | Field            | Value                             |
        | Designation      | Site Manager                      |  
        | Department       | <generated>                       |  
        | Phone Number     | <generated>                       |  
        | Role             | Admin                             |


  Scenario: User should be able to view Performance Summary
    Given I navigate to the login page
    When I enter "kautomation@krank-automation.com" in the email field
    And I enter "Super@dmin1" in the password field
    And I click on "Log in" button
    Then I should see "Select Organizations" screen
    When I click on "Automation Org" organization
    And I click on "Continue" button
    Then I should see "Dashboard" title screen
    When I click on profile icon
    And I click on "Profile Settings" option from the dropdown
    Then I should see following details in Profile drawer
        | Field      | Value                             |
        | Title      | KAutomation                       |  
        | Full Name  | KAutomation                       |  
        | Email      | kautomation@krank-automation.com  |  
        | Role       | Admin                             |
    When I click on "Performance Summary" tab
    Then the following overview metrics should be visible:
        | Average Work Order Completion Time |
        | On-Time Completion Rate            |
        | Total Hours Logged                 |
        | Total Reports Submitted            |
        | Templates Used / Created           |
        | Assets Inspected                   |
        | Sites Covered                      |

  Scenario: User should be able to Edit Organization Settings
    Given I navigate to the login page
    When I enter "kautomation@krank-automation.com" in the email field
    And I enter "Super@dmin1" in the password field
    And I click on "Log in" button
    Then I should see "Select Organizations" screen
    When I click on "Automation Org" organization
    And I click on "Continue" button
    Then I should see "Dashboard" title screen
    When I click on profile icon
    And I click on "Organization Settings" option from the dropdown