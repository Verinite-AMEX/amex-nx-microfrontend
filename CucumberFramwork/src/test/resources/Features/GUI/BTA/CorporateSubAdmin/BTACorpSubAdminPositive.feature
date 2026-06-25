@UI @BTA @CorporateSubAdmin

Feature: Verify that the Corporate Sub Admin user can successfully access the BTA portal,
  navigate to all available sections,and validate their functionality.

  Background:
    Given Navigate to the BTA Portal
    When I enter username "corp.sub.admin" and password "Corp@1234"
    And I click the login button
    Then I should see the MY BTA Home Page
    And Verify the User Management, Memo Statement, Large Reports ,Monthly Statement,Payment Allocation and Audit Trail sections are visible to Corporate Master and Sub user

  @CorporateSubAdmin_001 @Sanity
  Scenario: Verify BTA functionality for Corporate Sub Admin User
     # User Management
    Given User create new corporate user in user management section
#   Then User verify the Successful case submission in Case Management Section
    # Memo Statement
    When  Click the Memo Statement Section
    And User Select the BTA Number and click the View Statement
    And User Download the Memo Statement Excel
    Then User wait for few seconds
      # Large Reports
    When  Click the Large Reports Section
    And User Select the BTA Number and generate the report
      # Monthly Statement
    When Click the Monthly Statement Section
    And User Select the BTA Number and generate the Monthly report
      # Payment Allocation
    When Click the Payment Allocation Section
    And User Select the BTA Number and click the View Payment Allocation
      # Audit Trail
    When Click the Audit Trail Section
    And User Select the audit range and generate the Detailed report
#    And User Verify the generated report is displayed in the Audit Trail Section
    Then  User Select the audit range and generate the Summary report