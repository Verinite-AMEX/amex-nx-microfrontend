@UI @ONLS @PayWithPoints @Negative

Feature: Verify that the User is able to access the Select & Pay with Points in ONSL portal and validate their functionality.

  Background:
    Given Navigate to the Online Helper Portal
    When I enter username "sys.admin" and password "Admin@1234" in Online Helper Portal
    And I click the Online Helper login button
    Then I should see the MY BTA Home Page

  @PayWithPoints_001 @WIP
  Scenario:  Verify that user is able to retrieve details by entering valid card number in Online Account Service
    Given Navigate to the Online Helper Portal

