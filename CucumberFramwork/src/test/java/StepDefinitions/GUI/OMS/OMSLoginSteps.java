package StepDefinitions.GUI.OMS;

import Context.TestContext;
import Helper.UI.UiHelper;
import Utils.ConfigReader;
import Utils.LoggerUtils;
import Utils.WebDriverManagerUtil;
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

public class OMSLoginSteps {

    // ...existing fields...
    private UiHelper uiHelper;
    private WebDriver driver;
    private WebDriverWait wait;
    private TestContext context;

    public OMSLoginSteps(TestContext context) {

        this.context = context;
        driver = WebDriverManagerUtil.getDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        uiHelper = new UiHelper(driver);
    }

    @Given("Navigate to the OMS Portal")
    public void iAmOnTheLoginPage() {
        String loginUrl = ConfigReader.getProperty("OMSBaseUrl");
        WebDriverManagerUtil.navigateTo(loginUrl);
        LoggerUtils.logInfo("Navigated to OMS Portal");
    }

    @When("I enter username {string} and password {string} in OMS Portal")
    public void iEnterUsernameAndPassword(String username, String password) {
        uiHelper.enterText(By.xpath(""), username);
        uiHelper.enterText(By.xpath(""), password);
        LoggerUtils.logInfo("Entered username and password");
    }

    @When("I click the OMS login button")
    public void iClickTheLoginButton() {
        uiHelper.click(By.xpath(""));
        LoggerUtils.logInfo("Clicked login button");
    }
    @Then("I click the popup button")
    public void popup(){
        uiHelper.PasswordAlertHandle();
    }

    @Then("I should see the OMS Home Page")
    public void iShouldSeeTheWelcomeMessage() {
        WebElement welcomeMessage = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("")));
        assertTrue(welcomeMessage.isDisplayed(), "Home page is not displayed");
    }

}