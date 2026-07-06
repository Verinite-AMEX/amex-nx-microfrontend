package StepDefinitions.GUI.OnlineHelper;

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

public class OnlineHelperLoginSteps {

    // ...existing fields...
    private UiHelper uiHelper;
    private WebDriver driver;
    private WebDriverWait wait;
    private TestContext context;

    public OnlineHelperLoginSteps(TestContext context) {

        this.context = context;
        driver = WebDriverManagerUtil.getDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        uiHelper = new UiHelper(driver);
    }

    @Given("Navigate to the Online Helper Portal")
    public void iAmOnTheLoginPage() {
        String loginUrl = ConfigReader.getProperty("OnlineHelperBaseUrl");
        WebDriverManagerUtil.navigateTo(loginUrl);
        LoggerUtils.logInfo("Navigated to Online Helper Portal");
    }

    @When("I enter username {string} and password {string} in Online Helper Portal")
    public void iEnterUsernameAndPassword(String username, String password) {
        uiHelper.enterText(By.xpath("//input[@id='username']"), username);
        uiHelper.enterText(By.xpath("//input[@id='password']"), password);
        LoggerUtils.logInfo("Entered username and password");
    }

    @When("I click the Online Helper login button")
    public void iClickTheLoginButton() {
        uiHelper.click(By.xpath("/html/body/app-root/app-login/amex-login-form/div/div[4]/div[2]/div/div[4]/button"));
        LoggerUtils.logInfo("Clicked login button");
    }
    @Then("I click the popup button")
    public void popup(){
        uiHelper.PasswordAlertHandle();
    }

    @Then("I should see the Online Helper Home Page")
    public void iShouldSeeTheWelcomeMessage() {
        WebElement welcomeMessage = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/app-root/amex-page-component/div/header/div/amex-top-nav-bar/div[2]/span")));
        assertTrue(welcomeMessage.isDisplayed(), "Home page is not displayed");
    }

}