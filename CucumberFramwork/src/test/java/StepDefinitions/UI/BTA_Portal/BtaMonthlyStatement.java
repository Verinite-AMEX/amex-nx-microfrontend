package StepDefinitions.UI.BTA_Portal;

import Helper.UI.UiHelper;
import io.cucumber.java.en.Then;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import Utils.LoggerUtils;
import Utils.WebDriverManagerUtil;

public class BtaMonthlyStatement {
    private WebDriver driver;
    private UiHelper uiHelper;

    public BtaMonthlyStatement() {
        this.driver = WebDriverManagerUtil.getDriver();
        this.uiHelper = new UiHelper(this.driver);
    }

    @Then("Click the Monthly Statement Section")
    public void clickMonthlyStatement() {
         uiHelper.click(By.xpath("//a[normalize-space()='Monthly Statements']"));
        LoggerUtils.logInfo("Clicked the Monthly Statement Section");
    }

    @Then("User Select the BTA Number and generate the Monthly report")
    public void selectBtaNumberAndGenerateMonthlyReport() {
         uiHelper.selectDropdownByText(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-monthly-statement/div/div/div[2]/div[2]/div/select"), "BTACLIENTBAH002-3744XXXXXXX6130");
         uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-monthly-statement/div/div/div[2]/div[2]/button"));
         uiHelper.selectDropdownByText(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-monthly-statement/div/div/div[2]/div[8]/div[1]/div/select"), "December 2024");
         uiHelper.selectDropdownByText(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-monthly-statement/div/div/div[2]/div[8]/div[2]/select"),"Excel");
         uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-monthly-statement/div/div/div[2]/div[8]/div[2]/button"));
    }

    @Then("User Verify the generated report is displayed in the Monthly Statement Section")
    public void verifyMonthlyReport() {
          uiHelper.assertAndDismissAlertPopup("Downloading February 2025 in PDF format");
    }

}
