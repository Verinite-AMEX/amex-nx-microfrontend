@UI @BTA @TravelAgentMasterAdmin

Feature: Verify that the Travel Agent Master Admin can successfully access the BTA portal,
  navigate to all available sections,and validate their functionality.

  Background:
    Given Navigate to the BTA Portal
    When I enter username "ta.admin" and password "Travel@1234"
    And I click the login button
    Then I should see the MY BTA Home Page
    And Verify the User Management, Case Management,Audit Trail and TMC Transaction sections are visible to Travel Master and Sub user

  @TravelAgentMasterAdmin_001 @Sanity
  Scenario: Verify BTA functionality for Travel Master Admin User
#        User Management
    Given User create new TMC user in user management section
#   Then User verify the Successful case submission in Case Management Section
    # Case Management
    When  Click the Case Management Section
    And User create new case in case management section
    Then User Verify the created case is displayed in the Case Management Section
       # Audit Trail
    When Click the Audit Trail Section
    And User Select the audit range and generate the Detailed report
#    And User Verify the generated report is displayed in the Audit Trail Section
    Then  User Select the audit range and generate the Summary report
      # TMC Transaction
    When Click the TMC Transaction Section
    And User fetch the TMC Transaction details in TMC Transaction Section
