@UI @OMS @Negative @OmsLogin

Feature: Verify that the User is able to access the OMS Login in OMS portal and validate their functionality.

  @OMSLogin_001 @Sanity
  Scenario: Verify OMS Login functionality with valid credentials
    Given Navigate to the OMS Portal
    When  I enter username and password in OMS Portal
    Then  I click the OMS login button
    And   I should see the OMS Home Page


    



