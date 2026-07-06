package StepDefinitions.GUI.BTAPortal;

import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import Helper.UI.UiHelper;
import Utils.WebDriverManagerUtil;
import Utils.LoggerUtils;

public class BtaUserManagementSteps {
    private WebDriver driver;
    private final UiHelper uiHelper;

    public BtaUserManagementSteps() {
        this.driver = WebDriverManagerUtil.getDriver();
        this.uiHelper = new UiHelper(this.driver);
    }

    private String generatePhoneNumber() {
        long number = (long) (Math.random() * 9_000_000_000L) + 1_000_000_000L;
        return String.valueOf(number);
    }

    @When("Click the User Management Section")
    public void clickNewUser() {
        By newUserButton = By.xpath("//button[contains(text(),'Create New User')]");
        uiHelper.click(newUserButton);
        LoggerUtils.logInfo("Clicked New User button in User Management section");
    }

    @Then("User create new corporate user in user management section")
    public void SubmitCorporateUserRequest() {
        String uniqueEmail = "User" + (1000 + (int) (Math.random() * 9000)) + "@gmail.com";
        String UniqueUserID = "User" + System.currentTimeMillis();
        String ConfirmEmail = uniqueEmail;
        String PhoneNumber = generatePhoneNumber();
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-user-management/div[2]/div/div[2]/div/button[2]"));
        uiHelper.selectDropdownByText(By.xpath("//select[contains(@class,'corp-select-sm')]"), "Mr");
        uiHelper.enterText(By.xpath("//input[@placeholder='Enter full name']"), "John Doe");
        uiHelper.enterText(By.xpath("//input[@placeholder='Enter job title']"), "IT Manager");
        uiHelper.enterText(By.xpath("(//input[contains(@class,'phone-cc')])[1]"), "91");
        uiHelper.enterText(By.xpath("(//input[contains(@class,'phone-num')])[1]"), PhoneNumber);
        uiHelper.enterText(By.xpath("(//input[contains(@class,'phone-cc')])[2]"), "91");
        uiHelper.enterText(By.xpath("(//input[contains(@class,'phone-num')])[2]"), PhoneNumber);
        uiHelper.enterText(By.xpath("//input[@placeholder='user@example.com']"), uniqueEmail);
        uiHelper.enterText(By.xpath("//input[@placeholder='Re-enter email']"), ConfirmEmail);
        uiHelper.selectDropdownByText(By.xpath("//select[contains(@class,'corp-input') and not(@multiple)]"), "UAE");
        uiHelper.click(By.xpath("//input[@type='radio' and @value='admin']"));
        uiHelper.selectMultipleValues(By.xpath("//select[@multiple]"), "Emirates (BTA)");
        uiHelper.enterText(By.xpath("//input[@placeholder='Unique user ID']"), UniqueUserID);
        uiHelper.click(By.xpath("//button[contains(@class,'bta-btn-primary')]"));
    }


    @Then("User wait for few seconds")
    public void waitForFewSeconds() throws InterruptedException {
        Thread.sleep(4000);
        LoggerUtils.logInfo("Waited for few seconds to observe the result");
    }

    @Then("User create new TMC user in user management section")
    public void SubmitTMCUserRequest() {
        String uniqueEmail = "User" + (1000 + (int) (Math.random() * 9000)) + "@gmail.com";
        String UniqueUserID = "User" + System.currentTimeMillis();
        String ConfirmEmail = uniqueEmail;
        String PhoneNumber = generatePhoneNumber();
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-user-management/div[2]/div/div[2]/div[2]/button[2]"));
        uiHelper.selectDropdownByText(By.xpath("//select[contains(@class,'corp-select-sm')]"), "Mr");
        uiHelper.enterText(By.xpath("//input[@placeholder='Enter full name']"), "John Doe");
        uiHelper.enterText(By.xpath("//input[@placeholder='Enter job title']"), "IT Manager");
        uiHelper.enterText(By.xpath("(//input[contains(@class,'phone-cc')])[1]"), "91");
        uiHelper.enterText(By.xpath("(//input[contains(@class,'phone-num')])[1]"), PhoneNumber);
        uiHelper.enterText(By.xpath("(//input[contains(@class,'phone-cc')])[2]"), "91");
        uiHelper.enterText(By.xpath("(//input[contains(@class,'phone-num')])[2]"), PhoneNumber);
        uiHelper.enterText(By.xpath("//input[@placeholder='user@example.com']"), uniqueEmail);
        uiHelper.enterText(By.xpath("//input[@placeholder='Re-enter email']"), ConfirmEmail);
        uiHelper.selectDropdownByText(By.xpath("//select[contains(@class,'corp-input') and not(@multiple)]"), "UAE");
        uiHelper.click(By.xpath("//input[@type='radio' and @value='admin']"));
        uiHelper.selectMultipleValues(By.xpath("//select[@multiple]"), "Emirates (BTA)");
        uiHelper.enterText(By.xpath("//input[@placeholder='Unique user ID']"), UniqueUserID);
        uiHelper.click(By.xpath("//button[contains(@class,'bta-btn-primary')]"));
    }

    @Then("User Click on Corporate User Management")
    public void clickCorporateUserManagement() {
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-user-management/div[1]/button[1]"));
        LoggerUtils.logInfo("Clicked on Corporate User Management ");
    }

    @Then("User Click on TMC User Management")
    public void clickTMCUserManagement() {
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-user-management/div[1]/button[2]"));
        LoggerUtils.logInfo("Clicked on TMC User Management ");
    }

    @Then("User create new corporate user in user management by passing empty fields")
    public void SubmitCorporateUserRequestwithBlankValues() {
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-user-management/div[2]/div/div[2]/div/button[2]"));
        uiHelper.click(By.xpath("//button[contains(@class,'bta-btn-primary')]"));
    }

    @Then("User should see the validation messages for mandatory fields in user management section")
    public void verifyValidationMessages() {
        uiHelper.assertMultipleElementsDisplayed(
                new By[]{
                        By.xpath("//span[@class='error-msg' and contains(text(),'Salutation is required.')]"),
                        By.xpath("//span[@class='error-msg' and contains(text(),'Full Name is required.')]"),
                        By.xpath("//span[@class='error-msg' and contains(text(),'Business Phone Number is required.')]"),
                        By.xpath("//span[@class='error-msg' and contains(text(),'Email Address is required.')]"),
                        By.xpath("//span[@class='error-msg' and contains(text(),'Please confirm your Email Address.')]"),
                        By.xpath("//span[@class='error-msg' and contains(text(),'Country is required.')]"),
                        By.xpath("//span[@class='error-msg' and contains(text(),'User Type is required.')]"),
                        By.xpath("//span[@class='error-msg' and contains(text(),'Please select at least one BTA account.')]"),
                        By.xpath("//span[@class='error-msg' and contains(text(),'User ID is required.')]")
                },
                new String[]{
                        "Salutation validation message",
                        "Full Name validation message",
                        "Business Phone Number validation message",
                        "Email Address validation message",
                        "Confirm Email Address validation message",
                        "Country validation message",
                        "User Type validation message",
                        "BTA Account selection validation message",
                        "User ID validation message"
                }
        );
    }
}