@UI @ONLS @Positive @SupplementaryAccess

Feature: Verify that the User is able to access the Supplementary Access in ONSL portal and validate their functionality.

  Background:
    Given Navigate to the Online Helper Portal
    When I enter username "sys.admin" and password "Admin@1234" in Online Helper Portal
    And  I click the Online Helper login button
    And  I click the popup button
    Then I should see the Online Helper Home Page

  @SupplementaryAccess_001 @Sanity @WIP
  Scenario: Verify that user is able to retrieve details by entering valid user id in Supplementary Access section
    Given Navigate to Supplementary Access section
    When  I enter valid user id "supp15" in supplementary access section
    And   I click the supplementary search button
    Then  I should see the card details in the supplementary access section

