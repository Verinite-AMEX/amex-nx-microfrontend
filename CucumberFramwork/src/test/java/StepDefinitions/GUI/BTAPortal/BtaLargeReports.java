package StepDefinitions.GUI.BTAPortal;

import Helper.UI.UiHelper;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import Utils.LoggerUtils;
import Utils.WebDriverManagerUtil;

public class BtaLargeReports {
    private WebDriver driver;
    private UiHelper uiHelper;

    public BtaLargeReports() {
        this.driver = WebDriverManagerUtil.getDriver();
        this.uiHelper = new UiHelper(this.driver);
    }

    @When("Click the Large Reports Section")
    public void clickLargeReports() {
       uiHelper.click(By.xpath("//a[normalize-space()='Large Reports']"));
        LoggerUtils.logInfo("Clicked the Large Report Section");
    }

    @Then("User Select the BTA Number and generate the report")
    public void selectBtaNumberAndGenerateReport() {
        uiHelper.selectDropdownByText(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-large-reports/div/div/div[2]/div[1]/div[1]/div/select"), "BTACLIENTBAH002-3744XXXXXXX6130");
        uiHelper.selectRadioButton(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-large-reports/div/div/div[2]/div[1]/div[2]/div/div/label[1]/input"));
        uiHelper.selectDropdownByText(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-large-reports/div/div/div[2]/div[1]/div[3]/div/div/select[1]"), "October");
        uiHelper.selectDropdownByText(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-large-reports/div/div/div[2]/div[1]/div[3]/div/div/select[2]"), "2023");
        uiHelper.selectDropdownByText(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-large-reports/div/div/div[2]/div[1]/div[3]/div/div/select[3]"), "February");
        uiHelper.selectDropdownByText(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-large-reports/div/div/div[2]/div[1]/div[3]/div/div/select[4]"), "2025");
        uiHelper.selectRadioButton(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-large-reports/div/div/div[2]/div[1]/div[4]/div/div/label[2]/input"));
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-large-reports/div/div/div[2]/div[2]/button[2]"));
    }
    
    @Then("User Verify the generated report is displayed in the Large Report Section")
    public void verifyGeneratedReport() {
        uiHelper.assertSuccessMessage(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-large-reports/div/div/div[2]/div[3]"), "✓ Report queued for generation. You will be notified when it iss ready for download.");

    }

}
