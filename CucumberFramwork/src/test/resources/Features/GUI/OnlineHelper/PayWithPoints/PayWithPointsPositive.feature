@UI @ONLS @PayWithPoints @Positive

Feature: Verify that the User is able to access the Select & Pay with Points in ONSL portal and validate their functionality.

  Background:
    Given Navigate to the Online Helper Portal
    When I enter username "sys.admin" and password "Admin@1234" in Online Helper Portal
    And I click the Online Helper login button
    Then I should see the Online Helper Home Page

  @PayWithPoints_001 @Sanity @WIP
  Scenario:  Verify the user is able to view Eligible transactions in Select & Pay with Points section under Miscellanous Section - Eligible Card
    Given    Navigate to the Online Helper Portal
    When I click on the Miscellaneous section
    And I click on the Select & Pay with Points section
    Then I should see the Eligible transactions in Select & Pay with Points section under Miscellanous

  @PayWithPoints_001 @Sanity @WIP
  Scenario: Verify if the user is able to view History Summary in Select & Pay with Points section under Miscellanous Section - Eligible Card
    Given    Navigate to the Online Helper Portal
    When I click on the Miscellaneous section
    And I click on the Select & Pay with Points section
    Then I should see the History Summary in Select & Pay with Points section under Miscellanous

  @PayWithPoints_001 @Sanity @WIP
    Scenario: Verify if the user is able to view History Summary of 1 year in Select & Pay with Points section under Miscellanous Section
    Given    Navigate to the Online Helper Portal
    When I click on the Miscellaneous section
    And I click on the Select & Pay with Points section
    Then I should see the History Summary of 1 year in Select & Pay with Points section

