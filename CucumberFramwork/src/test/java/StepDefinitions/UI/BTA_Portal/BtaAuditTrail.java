package StepDefinitions.UI.BTA_Portal;

import Helper.UI.UiHelper;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import Utils.LoggerUtils;
import Utils.WebDriverManagerUtil;

public class BtaAuditTrail {
    private WebDriver driver;
    private UiHelper uiHelper;

    public BtaAuditTrail() {
        this.driver = WebDriverManagerUtil.getDriver();
        this.uiHelper = new UiHelper(this.driver);
    }

    @When("Click the Audit Trail Section")
    public void clickAuditTrail() {
      uiHelper.click(By.xpath("//a[normalize-space()='Audit Trail']"));
        LoggerUtils.logInfo("Clicked the Audit Trail Section");
    }

    @Then("User Select the audit range and generate the Detailed report")
    public void selectAuditRangeAndGenerateReport() {
        uiHelper.selectDropdownByText(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-audit-trail/div/div/div[2]/div[2]/div[1]/select[1]"), "2024");
        uiHelper.selectDropdownByText(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-audit-trail/div/div/div[2]/div[2]/div[1]/select[2]"), "October");
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-audit-trail/div/div/div[2]/div[2]/div[1]/button"));
       uiHelper.selectDropdownByText(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-audit-trail/div/div/div[2]/div[2]/div[2]/div[3]/select"), "Excel");
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-audit-trail/div/div/div[2]/div[2]/div[2]/div[3]/button"));
    }
@Then("User Select the audit range and generate the Summary report")
    public void selectAuditRangeAndGenerateSummaryReport() {
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-audit-trail/div/div/div[2]/div[1]/button[2]"));
        uiHelper.selectDate(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-audit-trail/div/div/div[2]/div[2]/div[1]/input[1]"),"09-04-2026");
        uiHelper.selectDate(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-audit-trail/div/div/div[2]/div[2]/div[1]/input[2]"),"09-10-2026");
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-audit-trail/div/div/div[2]/div[2]/div[2]/div/label[1]/input"));
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-audit-trail/div/div/div[2]/div[2]/div[2]/div/label[4]/input"));
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-audit-trail/div/div/div[2]/div[2]/div[3]/button"));
        uiHelper.selectDropdownByText(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-audit-trail/div/div/div[2]/div[2]/div[4]/div[2]/select"), "Excel");
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-audit-trail/div/div/div[2]/div[2]/div[4]/div[2]/button"));
           }

    @Then("User Verify the generated report is displayed in the Audit Trail Section")
    public void verifyGeneratedReport() {
        uiHelper.assertAndAcceptAlertPopup("Downloading in PDF");

    }

}
