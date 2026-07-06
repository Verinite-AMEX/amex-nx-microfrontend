package StepDefinitions.GUI.OnlineHelper;

import Context.TestContext;
import Helper.UI.UiHelper;
import Utils.LoggerUtils;
import Utils.WebDriverManagerUtil;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class SupplementaryAccessSteps {

    private UiHelper uiHelper;
    private WebDriver driver;
    private WebDriverWait wait;
    private TestContext context;
    private String enteredCardNumber;
    public SupplementaryAccessSteps(TestContext context) {

        this.context = context;
        driver = WebDriverManagerUtil.getDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        uiHelper = new UiHelper(driver);
    }

    @Given("Navigate to Supplementary Access section")
    public void iAmOnTheLoginPage() {
     uiHelper.click(By.xpath("//span[normalize-space()='Supplementary Access Helper']"));
        LoggerUtils.logInfo("Navigated to Online Account Services");
    }

    @When("I enter valid user id {string} in supplementary access section")
    public void iEnterValidUserId(String UserId) {
        this.enteredCardNumber = UserId;
        uiHelper.enterText(By.xpath("/html/body/app-root/amex-page-component/div/div/div/div/supp-entry/amex-page-component/div/div/div/div[2]/app-supp-search/div/div/div[2]/div[2]/input"), UserId);
         LoggerUtils.logInfo("Entered valid user id");
    }
    @When("I click the supplementary search button")
    public void iClickTheLoginButton() {
        uiHelper.click(By.xpath("//button[normalize-space()='Search']"));
        LoggerUtils.logInfo("Clicked login button");
    }
    @Then("I should see the card details in the supplementary access section")
    public void iShouldSeeuserId() {
      uiHelper.assertElementDisplayed(By.xpath("/html/body/app-root/amex-page-component/div/div/div/div/supp-entry/amex-page-component/div/div/div/div[2]/app-supp-search/div/table[2]/tbody/tr/td[1]"),enteredCardNumber);
    }
@And("I should see the error message displayed in the supplementary access section")
    public void iShouldSeeTheValidation() {
        uiHelper.assertSuccessMessage(By.xpath("/html/body/app-root/amex-page-component/div/div/div/div/supp-entry/amex-page-component/div/div/div/div[2]/app-supp-search/div/div/div[2]/div[2]/span"),"User ID \"" + enteredCardNumber + "\" not found.");
    }
}