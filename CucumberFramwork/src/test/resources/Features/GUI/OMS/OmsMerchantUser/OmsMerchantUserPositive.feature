@UI @OMS @Positive @OmsLogin

Feature: Verify that the User is able to access the online account service in OMS portal and validate their functionality.

  Background:
    Given Navigate to the OMS Portal
    When  I enter username "sys.admin" and password "Admin@1234" in OMS Portal
    And   I click the OMS login button
    And  I click the popup button
    Then  I should see the OMS Home Page


    



