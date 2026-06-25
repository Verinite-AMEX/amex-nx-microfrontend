@UI @ONLS @Positive @OnlineAccountServices

Feature: Verify that the User is able to access the online account service in ONSL portal and validate their functionality.

  Background:
    Given Navigate to the Online Helper Portal
    When I enter username "sys.admin" and password "Admin@1234" in Online Helper Portal
    And  I click the Online Helper login button
    Then I should see the MY BTA Home Page

  @OnlineAccountServices_001 @Sanity @WIP
  Scenario: Verify that user is able to retrieve details by entering valid card number in Online Account Service
    Given Navigate to online Account Services
    When  I enter valid card number "1234" in Online Account Service section
    And   I click the submit button
    Then  I should see the card details in Online Account Service section

  @OnlineAccountServices_002 @Sanity @WIP
  Scenario: Verify that user is able to perform unlock account in Online Account Service
    Given Navigate to online Account Services
    When  I enter valid card number "1234" in Online Account Service section
    And   I click the submit button
    And   I click the unlock account button
    Then  I should see the success message "Account unlocked successfully." in Online Account Service section

  @OnlineAccountServices_003 @Sanity @WIP
  Scenario: Verify that user is able to perform Delete account in Online Account Service
    Given Navigate to online Account Services
    When  I enter valid card number "1234" in Online Account Service section
    And   I click the submit button
    And   I click the delete account button
    Then  I should see the success message "Account deleted successfully." in Online Account Service section

  @OnlineAccountServices_004 @Sanity @WIP
  Scenario: Verify that user is able to navigate to Offers in Online Account Service
    Given Navigate to online Account Services
    When  I enter valid card number "1234" in Online Account Service section
    And   I click the submit button
    And   I click the offers link
    Then  I should see the offers page in Online Account Service section

  @OnlineAccountServices_005 @Sanity @WIP
  Scenario: Verify that user is able to navigate to benefits in Online Account Service
    Given Navigate to online Account Services
    When  I enter valid card number "1234" in Online Account Service section
    And   I click the submit button
    And   I click the benefits link
    Then  I should see the benefits page in Online Account Service section



