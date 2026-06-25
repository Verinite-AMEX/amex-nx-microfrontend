@UI @BTA @AmexInternalAdmin

Feature: Verify that the Amex Internal Admin user can successfully access the BTA portal,
  navigate to all available sections,and validate their functionality.

  Background:
    Given Navigate to the BTA Portal
    When I enter username "Amex.internal.admin" and password "Internal@1234"
    And I click the login button
    Then I should see the MY BTA Home Page
    And Verify the User Management, Memo Statement ,Monthly Statement, Audit Trail sections are visible to Amex Internal Admin user

  @AmexInternalAdmin_001 @Sanity
  Scenario: Verify BTA functionality for Amex Internal Admin User
     # User Management
    When User Click on Corporate User Management
    Then User create new corporate user in user management section
    And User wait for few seconds
#   Then User verify the Successful case submission in Case Management Section
   # TMC User Management
    When User Click on TMC User Management
    Then User create new TMC user in user management section
      # Audit Trail
    When Click the Audit Trail Section
    And User Select the audit range and generate the Detailed report
#    And User Verify the generated report is displayed in the Audit Trail Section
    Then  User Select the audit range and generate the Summary report
    # Memo Statement
    When  Click the Memo Statement Section
    And User Select the BTA Number and click the View Statement
    And User Download the Memo Statement Excel
      # Monthly Statement
    When Click the Monthly Statement Section
    And User Select the BTA Number and generate the Monthly report


