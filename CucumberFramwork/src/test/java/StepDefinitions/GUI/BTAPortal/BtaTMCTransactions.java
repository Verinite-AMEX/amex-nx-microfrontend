package StepDefinitions.GUI.BTAPortal;

import Helper.UI.UiHelper;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import Utils.LoggerUtils;
import Utils.WebDriverManagerUtil;

public class BtaTMCTransactions {
    private WebDriver driver;
    private UiHelper uiHelper;

    public BtaTMCTransactions() {
        this.driver = WebDriverManagerUtil.getDriver();
        this.uiHelper = new UiHelper(this.driver);
    }

    @When("Click the TMC Transaction Section")
    public void clickTMCTransaction() {
        uiHelper.click(By.xpath("//a[normalize-space()='TMC Transactions']"));
        LoggerUtils.logInfo("Clicked the Large Report Section");
    }

    @Then("User fetch the TMC Transaction details in TMC Transaction Section")
    public void fetchTMCTransactionDetails() {
        uiHelper.selectDate(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-tmc-transactions/div/div/div[2]/div[1]/div[1]/input"), "02-02-2026");
        uiHelper.selectDropdownByText(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-tmc-transactions/div/div/div[2]/div[1]/div[2]/select"), "Live Transaction");
        uiHelper.click(By.xpath("/html/body/app-root/amex-page-component/div/div[2]/div/div/app-bta-tmc-transactions/div/div/div[2]/div[1]/button"));

       }

//    @Then("User verify the Successful case submission in Case Management Section")
    public void verifyGeneratedReport() {
        uiHelper.assertAndAcceptAlertPopup("Comment submitted.");

    }

}
