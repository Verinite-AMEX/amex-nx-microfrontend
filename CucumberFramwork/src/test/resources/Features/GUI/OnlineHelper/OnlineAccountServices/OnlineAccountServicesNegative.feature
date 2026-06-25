@UI @ONLS @Negative @OnlineAccountServices

Feature: Verify that the User is able to access the online account service in ONSL portal and validate their functionality.

  Background:
    Given Navigate to the Online Helper Portal
    When  I enter username "sys.admin" and password "Admin@1234" in Online Helper Portal
    And   I click the Online Helper login button
    Then  I should see the MY BTA Home Page

  @OnlineAccountServices_001 @WIP
  Scenario: Verify that user is able to retrieve details by entering valid card number in Online Account Service
    Given Navigate to online Account Services
    When  i enter invalid card number "1234" in Online Account Service section
    And   i click the submit button
    Then  i should see the error message "Invalid card number."

    



