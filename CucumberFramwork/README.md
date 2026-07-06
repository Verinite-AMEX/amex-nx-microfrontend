# CucumberFramework

A **Hybrid Test Automation Framework** built with Java, Cucumber BDD, Selenium, and RestAssured — covering both **UI (Web)** and **API** test automation for the AEME application.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | Java 17 |
| BDD Framework | Cucumber 7 (Gherkin) |
| UI Automation | Selenium 4 + WebDriverManager |
| API Automation | RestAssured 5 |
| Test Runner | TestNG 7 |
| Reporting | ExtentReports 5 (HTML) |
| Build Tool | Maven |
| DI Container | PicoContainer |

---

## Project Structure

```
CucumberFramework/
├── src/test/
│   ├── java/
│   │   ├── Helper/
│   │   │   ├── Api/
│   │   │   │   └── ApiHelper.java          # REST API helper (GET, POST, PUT)
│   │   │   └── UI/
│   │   │       └── UiHelper.java           # Selenium UI helper (click, type, assert)
│   │   ├── AllRunners/
│   │   │   ├── ApiTestRunner.java          # Runs @API tagged scenarios only
│   │   │   └── UITestRunner.java           # Runs @UI tagged scenarios only
│   │   ├── StepDefinitions/
│   │   │   ├── api/
│   │   │   │   ├── AmexWearableSteps.java  # API step definitions (GET, POST, PUT)
│   │   │   │   └── Hooks.java              # API before/after hooks (no browser)
│   │   │   └── UI/
│   │   │       ├── LoginSteps.java         # Login page step definitions
│   │   │       ├── BtaUserManagementSteps  # User Management steps
│   │   │       ├── BtaMemoStatement.java   # Memo Statement steps
│   │   │       ├── BtaMonthlyStatement.java
│   │   │       ├── BtaLargeReports.java
│   │   │       ├── BtaPaymentAllocation.java
│   │   │       ├── BtaAuditTrail.java
│   │   │       ├── BtaCaseManagement.java
│   │   │       ├── BtaTMCTransactions.java
│   │   │       └── Hooks.java              # UI before/after hooks (browser lifecycle)
│   │   ├── Context/
│   │   │   └── TestContext.java            # Shared state across steps (PicoContainer)
│   │   ├── Listeners/
│   │   │   └── TestListener.java           # TestNG listener for ExtentReport
│   │   └── Utils/
│   │       ├── ConfigReader.java           # Reads config.properties
│   │       ├── WebDriverManagerUtil.java   # ThreadLocal WebDriver management
│   │       ├── ExtentReportManager.java    # HTML report generation
│   │       ├── FileUtils.java              # JSON template loader & updater
│   │       ├── ResponseUtils.java          # API response assertions & storage
│   │       └── LoggerUtils.java            # Console/file logging
│   └── resources/
│       ├── Config/
│       │   └── config.properties           # Environment URLs, browser, test data
│       ├── Features/
│       │   ├── API/
│       │   │   ├── GetAmexWearables.feature
│       │   │   ├── CreateAmexWearables.feature
│       │   │   └── CreateAmexWearablesAction.feature
│       │   └── UI/
│       │       ├── LoginPage.feature
│       │       ├── BTAUserManagement.feature
│       │       ├── BTAMemoStatement.feature
│       │       ├── BTAMonthlyStatement.feature
│       │       ├── BTALargeReports.feature
│       │       ├── BTAPaymentAllocation.feature
│       │       ├── BTAAuditTrail.feature
│       │       ├── BTACaseManagement.feature
│       │       └── BTATmcTransactions.feature
│       └── TestData/
│           ├── IssueWearableRequestTemplate.json    # POST wearable request body
│           └── WearableActionRequestTemplate.json   # POST wearable action body
├── logs/reports/                           # ExtentReport HTML files (auto-generated)
└── pom.xml
```

---

## Prerequisites

- **Java 17** or above — [Download](https://www.oracle.com/java/technologies/downloads/)
- **Maven 3.8+** — [Download](https://maven.apache.org/download.cgi)
- **Chrome Browser** (default) — or Firefox / Edge
- **IntelliJ IDEA Community Edition** (recommended) — [Download](https://www.jetbrains.com/idea/)
- **Git** — [Download](https://git-scm.com/download/win)

---

## Setup

**1. Clone the repository**
```bash
git clone https://github.com/Getup5/CucumberFramwork.git
cd CucumberFramwork
```

**2. Install dependencies**
```bash
mvn clean install -DskipTests
```

**3. Configure environment**

Edit `src/test/resources/Config/config.properties`:
```properties
# API
ApiBaseUrl=http://localhost:8080

# UI
uiBaseUrl=http://localhost:4200
browser=chrome

# Test Data
clientCode=12345
SerialNo=SN-SEED001
```

> Make sure your **backend** is running on port `8080` and **frontend** on port `4200` before executing tests.

---

## Running Tests

### Run API tests only (no browser)
```bash
mvn test -Papi
```

### Run UI tests only (browser opens)
```bash
mvn test -Pui
```

### Run all tests
```bash
mvn test -Pall
```

### Run by tag from command line
```bash
mvn test -Dcucumber.filter.tags="@Sanity"
mvn test -Dcucumber.filter.tags="@API"
mvn test -Dcucumber.filter.tags="@UI"
mvn test -Dcucumber.filter.tags="@CreateWearables"
```

### Run from IntelliJ
- Right-click `ApiTestRunner.java` → **Run** (API only — no browser)
- Right-click `UITestRunner.java` → **Run** (UI only — browser opens)
- Right-click any `.feature` file → **Run** specific scenario

---

## Available Tags

| Tag | Description |
|---|---|
| `@API` | All API test scenarios |
| `@UI` | All UI test scenarios |
| `@Sanity` | Quick smoke/sanity test suite |
| `@Login` | Login feature tests |

---

## Writing a New Test

### API Test

**1. Add request template** in `src/test/resources/TestData/YourRequestTemplate.json`:
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

**2. Write feature file** in `src/test/resources/Features/API/YourFeature.feature`:
```gherkin
@API @YourTag
Feature: Your API Feature

  @Sanity
  Scenario: Your scenario
    Given i have "YourAPI" api request with template "YourRequest" and following details
      | field1 | overrideValue |
    When i POST "YourEndpoint" api request
    Then the http status code should be "200"
    And the following response details should be present
      | locator | value |
      | success | true  |
```

**3. Add endpoint** in `AmexWearableSteps.java` switch-case and `config.properties`.

---

### UI Test

**1. Write feature file** in `src/test/resources/Features/UI/YourFeature.feature`:
```gherkin
@UI @YourTag
Feature: Your UI Feature

  Background:
    Given Navigate to the AEME Portal
    When I enter username "admin" and password "admin"
    Then I click the login button

  @Sanity
  Scenario: Your scenario
    When your step here
    Then your assertion here
```

**2. Add step definition** in `src/test/java/StepDefinitions/UI/YourSteps.java` using `UiHelper` methods.

---

## Reports

After test execution, HTML reports are generated at:

```
logs/reports/ExtentReport_dd-MM-yyyy_HH-mm-ss.html
```

Open in any browser to view:
- Pass / Fail / Skip status per scenario
- Step-by-step execution details
- Screenshot on failure (UI tests)
- Response logs (API tests)

---

## Key Design Decisions

**ThreadLocal WebDriver** — Each test thread gets its own browser instance. Prevents browser from opening during API test runs.

**UI Hooks tagged `@UI`** — `@Before("@UI")` and `@After("@UI")` ensure browser only opens/closes for scenarios tagged `@UI`. API scenarios are completely unaffected.

**PicoContainer DI** — `TestContext` is injected into every step definition class automatically — no static variables needed for sharing state between steps.

**Template-based API requests** — JSON request bodies are stored as templates. DataTable overrides specific fields per test scenario — keeping tests clean and readable.

**ConfigReader** — All environment values (URLs, credentials, browser) are read from `config.properties` — no hardcoded values in test code.

---

## Troubleshooting

**`git` not recognized in PowerShell**
```powershell
$env:PATH += ";C:\Program Files\Git\cmd"
```
Or add `C:\Program Files\Git\cmd` to System Environment Variables → PATH permanently.

**Browser opens during API tests**
Ensure `@Before("@UI")` annotation is used in `StepDefinitions/UI/Hooks.java` — not plain `@Before()`.

**`ExtentReport` is empty / not generated**
Ensure `ExtentReportManager.flushReport()` is called in both `@After` hooks (UI and API).

**Port already in use on 8080**
```bash
# Mac/Linux
lsof -i :8080
kill -9 <PID>

# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

---

## Contributing

1. Create a new branch: `git checkout -b feature/your-feature`
2. Make changes and commit: `git commit -m "Add your feature"`
3. Push: `git push origin feature/your-feature`
4. Open a Pull Request on GitHub
