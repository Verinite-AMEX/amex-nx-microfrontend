package StepDefinitions.UI.BTA_Portal;

import Helper.UI.UiHelper;
import Context.TestContext;
import io.cucumber.java.en.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import Utils.ConfigReader;
import Utils.LoggerUtils;
import Utils.WebDriverManagerUtil;

import java.time.Duration;

import static org.testng.Assert.*;

public class BTALoginSteps {

    // ...existing fields...
    private UiHelper uiHelper;
    private WebDriver driver;
    private WebDriverWait wait;
    private TestContext context;

    public BTALoginSteps(TestContext context) {

        this.context = context;

        driver = WebDriverManagerUtil.getDriver();

        wait = new WebDriverWait(driver, Duration.ofSeconds(15));

        uiHelper = new UiHelper(driver);
    }

    @Given("Navigate to the BTA Portal")
    public void iAmOnTheLoginPage() {
        String loginUrl = ConfigReader.getProperty("BTAbaseUrl");
        WebDriverManagerUtil.navigateTo(loginUrl);
        LoggerUtils.logInfo("Navigated to BTA Portal");
    }

    @When("I enter username {string} and password {string}")
    public void iEnterUsernameAndPassword(String username, String password) {
        uiHelper.enterText(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-login/div/div[2]/div[2]/input"), username);
        uiHelper.enterText(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-login/div/div[2]/div[3]/input"), password);
        LoggerUtils.logInfo("Entered username and password");
    }

    @When("I click the login button")
    public void iClickTheLoginButton() {
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-login/div/div[2]/div[5]/button"));
        LoggerUtils.logInfo("Clicked login button");
    }

    @Then("I should see the MY BTA Home Page")
    public void iShouldSeeTheWelcomeMessage() {
        WebElement welcomeMessage = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/app-root/amex-page-component/div/header/amex-top-nav-bar/div[2]/span")));
        assertTrue(welcomeMessage.isDisplayed(), "Home page is not displayed");
        LoggerUtils.logInfo("Home page landed successfully");
    }

    @Then("Verify the Memo Statement, Large Reports ,Monthly Statement,Payment Allocation and Audit Trail sections are visible to Corporate user")
    public void verifyCorpUserSectionsVisibility() {
        By[] navigationMenus = {
                By.xpath("//a[normalize-space()='Memo Statement']"),
                By.xpath("//a[normalize-space()='Large Reports']"),
                By.xpath("//a[normalize-space()='Monthly Statements']"),
                By.xpath("//a[normalize-space()='Payment Allocation']"),
                By.xpath("//a[normalize-space()='Audit Trail']")
        };
        String[] menuNames = {
                "Memo Statement",
                "Large Reports",
                "Monthly Statements",
                "Payment Allocation",
                "Audit Trail"
        };
        uiHelper.assertMultipleElementsDisplayed(navigationMenus, menuNames);
    }
    @Then("Verify the User Management, Memo Statement, Large Reports ,Monthly Statement,Payment Allocation and Audit Trail sections are visible to Corporate Master and Sub user")
    public void verifyCorpMasterSubSectionsVisibility() {
        By[] navigationMenus = {
                By.xpath("//a[normalize-space()='User Management']"),
                By.xpath("//a[normalize-space()='Memo Statement']"),
                By.xpath("//a[normalize-space()='Large Reports']"),
                By.xpath("//a[normalize-space()='Monthly Statements']"),
                By.xpath("//a[normalize-space()='Payment Allocation']"),
                By.xpath("//a[normalize-space()='Audit Trail']")
        };
        String[] menuNames = {
                "User Management",
                "Memo Statement",
                "Large Reports",
                "Monthly Statements",
                "Payment Allocation",
                "Audit Trail"
        };
        uiHelper.assertMultipleElementsDisplayed(navigationMenus, menuNames);
    }
    @Then("Verify the User Management, Case Management,Audit Trail and TMC Transaction sections are visible to Travel Master and Sub user")
    public void verifyTravelMasterSubSectionsVisibility() {
        By[] navigationMenus = {
                By.xpath("//a[normalize-space()='User Management']"),
                By.xpath("//a[normalize-space()='Case Management']"),
                By.xpath("//a[normalize-space()='Audit Trail']"),
                By.xpath("//a[normalize-space()='TMC Transactions']"),
        };
        String[] menuNames = {
                "User Management",
                "Case Management",
                "Audit Trail",
                "TMC Transactions"
        };
        uiHelper.assertMultipleElementsDisplayed(navigationMenus, menuNames);
    }

    @Then("Verify the Case Management and TMC Transaction sections are visible to Travel Agent user")
    public void verifyTravelAgentSectionsVisibility() {
        By[] navigationMenus = {
                By.xpath("//a[normalize-space()='Case Management']"),
                By.xpath("//a[normalize-space()='TMC Transactions']"),
        };
        String[] menuNames = {
                "Case Management",
                "TMC Transactions"
        };
        uiHelper.assertMultipleElementsDisplayed(navigationMenus, menuNames);
    }
    @Then("Verify the User Management, Memo Statement ,Monthly Statement, Audit Trail sections are visible to Amex Internal Admin user")
    public void verifyAmexInternalAdminSectionsVisibility() {
        By[] navigationMenus = {
                By.xpath("//a[normalize-space()='User Management']"),
                By.xpath("//a[normalize-space()='Audit Trail']"),
                By.xpath("//a[normalize-space()='Memo Statement']"),
                By.xpath("//a[normalize-space()='Monthly Statements']"),

        };
        String[] menuNames = {
                "User Management",
                "Memo Statement",
                "Monthly Statements",
                "Audit Trail"
        };
        uiHelper.assertMultipleElementsDisplayed(navigationMenus, menuNames);
    }
}