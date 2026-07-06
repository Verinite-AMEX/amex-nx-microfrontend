package StepDefinitions.GUI.BTAPortal;

import Helper.UI.UiHelper;
import Utils.LoggerUtils;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import Utils.WebDriverManagerUtil;

public class BtaCaseManagement {
    private WebDriver driver;
    private UiHelper uiHelper;

    public BtaCaseManagement() {
        this.driver = WebDriverManagerUtil.getDriver();
        this.uiHelper = new UiHelper(this.driver);
    }
    @When("Click the Case Management Section")
    public void clickCaseManagement() {
        uiHelper.click(By.xpath("//a[normalize-space()='Case Management']"));
        LoggerUtils.logInfo("Clicked the Case Management Section");
    }
    @Then("User create new case in case management section")
    public void createNewCase() {
        uiHelper.enterText(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-case-management/div/div/div[2]/div[1]/input"), "CASE101");
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-case-management/div/div/div[2]/div[1]/button[1]"));
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-case-management/div/div/div[2]/table/tbody/tr/td[8]/a"));
        uiHelper.enterText(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-case-management/div/div/div[2]/div[2]/textarea"), "Transaction dispute resolved From Backend System");
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-case-management/div/div/div[2]/div[3]/button[2]"));
    }


     @Then("User Verify the created case is displayed in the Case Management Section")
    public void verifyCreatedCase() {
        uiHelper.assertSuccessMessage(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-case-management/div/div/div[2]/div[4]"), "Comment submitted successfully.");
    }
}
