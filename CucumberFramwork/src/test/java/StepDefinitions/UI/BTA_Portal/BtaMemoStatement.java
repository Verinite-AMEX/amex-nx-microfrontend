package StepDefinitions.UI.BTA_Portal;

import Helper.UI.UiHelper;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import Utils.LoggerUtils;
import Utils.WebDriverManagerUtil;

public class BtaMemoStatement {
    private WebDriver driver;
    private UiHelper uiHelper;

    public BtaMemoStatement() {
        this.driver = WebDriverManagerUtil.getDriver();
        this.uiHelper = new UiHelper(this.driver);
    }

    @When("Click the Memo Statement Section")
    public void clickMemoStatement() {
       uiHelper.click(By.xpath("//a[normalize-space()='Memo Statement']"));
        LoggerUtils.logInfo("Clicked the Memo Statement Section");
    }
    @Then("User Select the BTA Number and click the View Statement")
    public void selectBtaNumberFromDropdown() {
        uiHelper.selectDropdownByText(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-memo-statement/div/div/div[2]/div/div/select"), "BTACLIENTBAH002-3744XXXXXXX6130");
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-memo-statement/div/div/div[2]/div/button"));
       }

       @Then("User Download the Memo Statement PDF")
       public void downloadPDFMemoStatement() {
           uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-memo-statement/div/div/div[2]/div[7]/div/button"));
           LoggerUtils.logInfo("Clicked PDF download button");
       }

    @Then("User Download the Memo Statement Excel")
    public void downloadExcelMemoStatement() {
       uiHelper.selectDropdownByText(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-memo-statement/div/div/div[2]/div[7]/div/select"), "Excel");
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-memo-statement/div/div/div[2]/div[7]/div/button"));
        LoggerUtils.logInfo("Clicked Excel download button");
    }

    @Then("User Download the Memo Statement RTF")
    public void downloadRTFMemoStatement() {
        uiHelper.selectDropdownByText(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-memo-statement/div/div/div[2]/div[7]/div/select"), "RTF");
        uiHelper.click(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-memo-statement/div/div/div[2]/div[7]/div/button"));
        LoggerUtils.logInfo("Clicked RTF download button");
       uiHelper.handleDownloadPopup();
    }

    @Then("User Download the Memo Statement CSV")
    public void downloadCSVMemoStatement() {
        uiHelper.selectDropdownByText(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-memo-statement/div/div/div[2]/div[7]/div/select"), "CSV");
        uiHelper.click(By.xpath("/html/body/app-root/div[2]/div/div/bta-entry/div/div[2]/app-bta-memo-statement/div/div/div[2]/div[7]/div/button"));
        LoggerUtils.logInfo("Clicked CSV download button");
        uiHelper.handleDownloadPopup();
    }
}
