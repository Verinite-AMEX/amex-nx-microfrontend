package StepDefinitions.GUI.OnlineHelper;

import Context.TestContext;
import Helper.UI.UiHelper;
import Utils.ConfigReader;
import Utils.LoggerUtils;
import Utils.WebDriverManagerUtil;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.testng.Assert.assertTrue;

public class OnlineAccountServicesSteps {

    // ...existing fields...
    private UiHelper uiHelper;
    private WebDriver driver;
    private WebDriverWait wait;
    private TestContext context;
    private String enteredCardNumber;
    public OnlineAccountServicesSteps(TestContext context) {

        this.context = context;
        driver = WebDriverManagerUtil.getDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        uiHelper = new UiHelper(driver);
    }

    @Given("Navigate to online Account Services")
    public void iAmOnTheLoginPage() {
     uiHelper.click(By.xpath("//span[normalize-space()='Online Account Services']"));
        LoggerUtils.logInfo("Navigated to Online Account Services");
    }

    @When("I enter valid card number {string} in Online Account Service section")
    public void iEnterValidCardNumber(String CardNumber) {
        this.enteredCardNumber = CardNumber;
        uiHelper.enterText(By.xpath("/html/body/app-root/amex-page-component/div/div/div/div/app-online-account-entry/app-nx-welcome/app-search-card-user/div/div/div/div/div[2]/div/ui-input[2]/div/input"), CardNumber);
         LoggerUtils.logInfo("Entered valid card number");
    }

    @When("I enter invalid valid user Id {string} in Online Account Service section")
    public void iEnterInvalidUserId(String CardNumber) {
        uiHelper.enterText(By.xpath("/html/body/app-root/amex-page-component/div/div/div/div/app-online-account-entry/app-nx-welcome/app-search-card-user/div/div/div/div/div[2]/div/ui-input[2]/div/input"), CardNumber);
        LoggerUtils.logInfo("Entered invalid user id");
    }

    @When("I click the search button")
    public void iClickTheLoginButton() {
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div/div/div/app-online-account-entry/app-nx-welcome/app-search-card-user/div/div/div/div/div[2]/div/ui-button[1]/button"));
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div/div/div/app-online-account-entry/app-nx-welcome/app-search-card-user/div/div/div/div/div[2]/div/ui-button[1]/button"));
        LoggerUtils.logInfo("Clicked login button");
    }

    @Then("I should see the card details in Online Account Service section")
    public void iShouldSeeTheCardDetails() {
      uiHelper.assertElementDisplayed(By.xpath("/html/body/app-root/amex-page-component/div/div/div/div/app-online-account-entry/app-nx-welcome/app-search-card-user/div/div/div/div/div[2]/div[2]/p"),"supp15 is registered.");
    }
@And("i should see the error message displayed in Online Account Service section")
    public void iShouldSeeTheErrorMessage() {
        uiHelper.assertSuccessMessage(By.xpath("/html/body/app-root/amex-page-component/div/div/div/div/supp-entry/amex-page-component/div/div/div/div[2]/app-supp-search/div/div/div[2]/div[2]/span"),"User ID \"" + enteredCardNumber + "\" not found.");
    }
}