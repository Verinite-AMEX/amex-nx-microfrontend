@UI @OMS @Negative @OmsLogin

Feature: Verify the negative scenarios of the OMS Login functionality.

  @OMSLogin_001 @Sanity @Negative
  Scenario: Verify OMS Login functionality with valid credentials
    Given Navigate to the OMS Portal
    When  I enter invalid username "abc" and password "1234" in OMS Portal
    Then  I click the OMS login button
    And   I should see the login validation message


    



