@UI @ONLS @Negative @OnlineAccountServices

Feature: Verify that the User is able to access the online account service in ONSL portal and validate their functionality.

  Background:
    Given Navigate to the Online Helper Portal
    When  I enter username "sys.admin" and password "Admin@1234" in Online Helper Portal
    And   I click the Online Helper login button
    And  I click the popup button
    Then  I should see the Online Helper Home Page

  @OnlineAccountServices_001
  Scenario: Verify that user is able to retrieve details by entering invalid user id in Online Account Service
    Given  Navigate to online Account Services
    When  I enter invalid valid user Id "abcd" in Online Account Service section
    And   I click the search button
    Then  i should see the error message displayed in Online Account Service section

    



