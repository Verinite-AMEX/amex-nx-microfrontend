@UI @BTA @CorporateMasterAdminNegative

Feature: Verify that the Corporate Master Admin user can successfully access the BTA portal,
  navigate to all available sections and Perform Negative functionality.

  Background:
    Given Navigate to the BTA Portal
    When I enter username "corp.admin" and password "Corp@1234"
    And I click the login button
    Then I should see the MY BTA Home Page
    And Verify the User Management, Memo Statement, Large Reports ,Monthly Statement,Payment Allocation and Audit Trail sections are visible to Corporate Master and Sub user

  @CorporateMasterAdmin_001 @Sanity
  Scenario: Verify BTA Corp Master Admin create New user with empty Values
    Given User create new corporate user in user management by passing empty fields
    Then User should see the validation messages for mandatory fields in user management section
