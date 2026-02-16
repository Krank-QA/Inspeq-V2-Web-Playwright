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
    And I should see User Role field disabled with value "Admin"
    When I select "PK" as country in phone number dropdown  
    And I enter Random number in the phone number field
    And I click on Designation dropdown
    And I select "Site Manager" as designation in dropdown
    And I enter "Automation" in department field
    And I click on "Update User" button on modal
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

  Scenario: User should be able to Edit Organization General Settings
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
    Then I should see "Organization Details" Heading 
    When I click on Industry dropdown
    Then I should see following industries in dropdown
        | Construction |
        | Heavy Equipment & Machinery |
        | Oil & Gas |
        | Manufacturing |
        | Healthcare |
        | Restaurants |
        | Residential & Real Estate |
        | Facility Management |
        | Transportation & Logistics |
        | Automobile |
        | Renewable Energy |
        | Other |
      When I select "Mining" as industry in dropdown
      And I enter "TestAutomation@krank.com" in organization email field
      And I select "PK" as country in phone number dropdown on general settings screen
      And I enter Random number in the phone number field on general settings screen
      And I click on "Update Details" button
      Then I should see "Successfully updated organization" success message 

  Scenario: User should be able to Add User in Organization Settings
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
    Then I should see "Organization Details" Heading 
    When I click on "Users" tab button
    And I click on "Add User" button on users screen
    Then I should see "Invite New User" modal
    When I enter "ATuser1" in the full name field on modal
    And I enter "ATuser1@krank.com" in the email field on modal
    And I select "PK" as country in phone number dropdown  
    And I enter Random number in the phone number field
    And I click on Designation dropdown
    And I select "Site Manager" as designation in dropdown
    And I enter "Automation" in department field
    And I click on Add Role dropdown
    And I select "Admin" as role in dropdown
    And I click on "Invite User" button on modal
    Then I should see "Successfully invited user." success message 
    When I click on "atuser1@krank.com" user
    Then I should see following details in Profile drawer
        | Field            | Value                             |
        | Title            | ATuser1                           |  
        | Full Name        | ATuser1                           |  
        | Email            | atuser1@krank.com                 |  
        | Phone Number     | -                                 | 
        | Designation      | -                                 |  
        | Department       | <generated>                       |  
        | Role             | Admin                             |

Scenario: User should be able to Cancel User Invite in Organization Settings
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
    Then I should see "Organization Details" Heading 
    When I click on "Users" tab button
    And I click on "atuser1@krank.com" user
    Then I should see following details in Profile drawer
        | Field            | Value                             |
        | Title            | ATuser1                           |  
        | Full Name        | ATuser1                           |  
        | Email            | atuser1@krank.com                 |  
        | Phone Number     | -                                 | 
        | Designation      | -                                 |  
        | Role             | Admin                             |
    When I click on "Cancel Invite" button on profile drawer
    Then I should see "Successfully cancelled invite." success message 
    

  Scenario: User should be able to Edit User in Organization Settings
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
    Then I should see "Organization Details" Heading 
    When I click on "Users" tab button
    And I click on "shaheer.k@krank.com" user
    Then I should see following details in Profile drawer
        | Field      | Value                             |
        | Title      | AutoTest User                     |  
        | Full Name  | AutoTest User                     |  
        | Email      | shaheer.k@krank.com               |  
        | Role       | Admin                             |
    When I click on "Edit User" button on profile drawer
    Then I should see "Edit User" modal
    And I should see Email Address field disabled and value should be "shaheer.k@krank.com"
    And I should see User Role field with value "Admin"
    When I select "PK" as country in phone number dropdown  
    And I enter Random number in the phone number field
    And I click on Designation dropdown
    And I select "Site Manager" as designation in dropdown
    And I enter "Automation" in department field
    And I click on "Update User" button on modal
    Then I should see "Successfully updated user" success message 
    And I should see following details in Profile drawer
        | Field            | Value                             |
        | Designation      | Site Manager                      |  
        | Department       | <generated>                       |  
        | Phone Number     | <generated>                       |  
        | Role             | Admin                             | 

  Scenario: User should be able to deactivate User in Organization Settings
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
    Then I should see "Organization Details" Heading 
    When I click on "Users" tab button
    And I click on "shaheer.k@krank.com" user
    Then I should see following details in Profile drawer
        | Field      | Value                             |
        | Title      | AutoTest User                     |  
        | Full Name  | AutoTest User                     |  
        | Email      | shaheer.k@krank.com               |  
        | Role       | Admin                             |
    When I click on "Deactivate User" button on profile drawer
    Then I should see "Status updated successfully." success message 
    And I should see "Inactive" status in profile drawer
    When I click on "Mark as Active" button on profile drawer
    Then I should see "User activated successfully." success message 
    And I should see "Active" status in profile drawer


 Scenario: User should be able to view usage details in Organization Settings
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
    Then I should see "Organization Details" Heading 
    When I click on "Billing" tab button
    Then I should see following usage details attributes
        | Users |
        | Work Orders and Submissions |  
        | Remote Work Orders |  
        | Templates |  
        | AI Template |
        | Assets | 
        | Site |

# Commented since there is no delete journey custom role
# Scenario: User should be able to Add Custom Role in Organization Settings
#     Given I navigate to the login page
#     When I enter "kautomation@krank-automation.com" in the email field
#     And I enter "Super@dmin1" in the password field
#     And I click on "Log in" button
#     Then I should see "Select Organizations" screen
#     When I click on "Automation Org" organization
#     And I click on "Continue" button
#     Then I should see "Dashboard" title screen
#     When I click on profile icon
#     And I click on "Organization Settings" option from the dropdown
#     Then I should see "Organization Details" Heading 
#     When I click on "Role & Permissions" tab button
#     And I click on "Add Custom Role" button on role & permissions screen
#     Then I should see "Add Custom Role" modal
#     And I should see following checkboxes unchecked
#         | View Team KPIs |
#         | View All Work Orders |
#         | Create Work Orders |
#         | Edit Work Orders |
#         | View All Assets |
#         | Create & Edit Assets |
#         | Delete Assets |
#         | View All Sites |
#         | Create & Edit Sites |
#         | Delete Sites |
#         | View All Templates |
#         | Create & Edit Templates |
#         | Delete Templates |
#         | View All Reports |
#         | Create & Edit Reports |
#         | Manage General Settings |
#         | Manage Roles & Permissions |
#         | Manage Users |
#         | Manage Billing & Subscription |
#     When I type "Automation Role" in Role Name field on modal
#     And I click on following checkboxes
#           | View Team KPIs |
#         | View All Work Orders |
#         | Create Work Orders |
#         | Edit Work Orders |
#         | View All Assets |
#         | Create & Edit Assets |
#         | Delete Assets |
#         | View All Sites |
#         | Create & Edit Sites |
#         | Delete Sites |
#         | View All Templates |
#         | Create & Edit Templates |
#         | Delete Templates |
#         | View All Reports |
#         | Create & Edit Reports |
#         | Manage General Settings |
#         | Manage Roles & Permissions |
#         | Manage Users |
#         | Manage Billing & Subscription |
#     Then I should see following checkboxes checked
#         | View Team KPIs |
#         | View All Work Orders |
#         | Create Work Orders |
#         | Edit Work Orders |
#         | View All Assets |
#         | Create & Edit Assets |
#         | Delete Assets |
#         | View All Sites |
#         | Create & Edit Sites |
#         | Delete Sites |
#         | View All Templates |
#         | Create & Edit Templates |
#         | Delete Templates |
#         | View All Reports |
#         | Create & Edit Reports |
#         | Manage General Settings |
#         | Manage Roles & Permissions |
#         | Manage Users |
#         | Manage Billing & Subscription |
#     And I click on "Add Custom Role" button on Add Custom Role modal
#     Then I should see "Successfully created role" success message 
