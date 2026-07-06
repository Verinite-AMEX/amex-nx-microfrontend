@UI @BTA @TravelAgentUser

Feature: Verify that the Travel Agent User can successfully access the BTA portal,
  navigate to all available sections,and validate their functionality.

  Background:
    Given Navigate to the BTA Portal
    When I enter username "ta.user" and password "Travel@1234"
    And I click the login button
    Then I should see the MY BTA Home Page
    And Verify the Case Management and TMC Transaction sections are visible to Travel Agent user

  @TravelAgentUser_001 @Sanity
  Scenario: Verify BTA functionality for Travel Agent User
    # Case Management
    When User create new case in case management section
    Then User Verify the created case is displayed in the Case Management Section
#       TMC Transaction
    When Click the TMC Transaction Section
    And User fetch the TMC Transaction details in TMC Transaction Section
