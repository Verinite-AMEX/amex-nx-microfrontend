package Runners;

import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;

@CucumberOptions(
        features = "src/test/resources/Features/UI",
        glue = "StepDefinitions.UI",
        tags = "@UI and not @WIP",
        objectFactory = io.cucumber.picocontainer.PicoFactory.class,
        plugin = {
                "pretty",
                "html:target/ui-cucumber-report.html",
                "json:target/ui-cucumber.json",
                "junit:target/ui-cucumber.xml"
        }
)
public class UiTestRunner extends AbstractTestNGCucumberTests {
}
