@UI @Statement @ONLS

Feature: Verify that the User is able to access the Statement and Central Statement in ONSL portal and validate their functionality.

  Background:
    Given Navigate to the Online Helper Portal
    When I enter username "sys.admin" and password "Admin@1234" in Online Helper Portal
    And  I click the Online Helper login button
    Then I should see the MY BTA Home Page

  @Statement_001 @WIP
  Scenario: Verify that user is able to retrieve the Latest statement details by entering invalid card number in Statement section
    Given Navigate to Statement section
    When  I enter invalid card number "sgwsegwegbewbg" in Statement section
    And   I click the submit button
    Then  I should see an error message indicating the card number is invalid in Statement section

  @Statement_002 @WIP
  Scenario: Verify that user is able to retrieve the Central statement details by entering valid card number in Statement section
    Given Navigate to Central Statement section
    When  I enter valid card number "1234" in Central Statement section
    And   I click the View Statement button
    Then  I should see the card statement details in Central Statement section

  @Statement_003 @WIP
  Scenario: Verify that user is able to retrieve the AFP statement details by entering Invalid card number in Statement section
    Given Navigate to AFP Statement section
    When  I enter invalid card number "sgwsegwegbewbg" in AFP Statement section
    And   I click the View Statement button
    Then  I should see an error message indicating the card number is invalid in AFP Statement section

  @Statement_004 @WIP
  Scenario: Verify that user is able to retrieve the Customer statement details by entering invalid card number in Statement section
    Given Navigate to Customer Statement section
    When  I enter invalid card number "sgwsegwegbewbg" in Customer Statement section
    And   I click the View Statement button
    Then  I should see an error message indicating the card number is invalid in Customer Statement section

  @Statement_005  @WIP
  Scenario: Verify that user is able to retrieve the Statement(Beta) statement details by entering invalid card number in Statement section
    Given Navigate to Statement(Beta) Statement section
    When  I enter invalid card number "sgwsegwegbewbg" in Statement(Beta) Statement section
    And   I click the View Statement button
    Then  I should see an error message indicating the card number is invalid in Statement(Beta) Statement section

  @Statement_006  @WIP
  Scenario: Verify that user is able to retrieve the Central statement(old) details by entering invalid card number in Statement section
    Given Navigate to Central Statement(Old) section
    When  I enter invalid card number "sgwsegwegbewbg" in Central Statement(Old) Statement section
    And   I click the View Statement button
    Then  I should see an error message indicating the card number is invalid in Central Statement(Old) Statement section


