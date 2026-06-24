pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
        maven   'MAVEN_HOME'
    }

    environment {
        SONAR_HOST_URL = 'http://localhost:9000'
        NX_ROOT        = "${WORKSPACE}"

        // shell : port 4200   bta-portal : port 4203   oms : port 4201
        // format  projectFolder:sonarKey:servePort
        PROJECTS = 'shell:amex-shell:4200 bta-portal:amex-bta-portal:4203 oms:amex-oms:4201'

        ZAP_EXE  = 'C:\\Program Files\\ZAP\\Zed Attack Proxy\\zap.bat'
    }

    stages {

        // ─────────────────────────────────────────────────────────────
        stage('Checkout') {
            steps {
                cleanWs()
                echo '==========================='
                echo 'Checking out code...'
                echo '==========================='
                checkout scm
            }
        }

        // ─────────────────────────────────────────────────────────────
        // Single install at workspace root — one shared node_modules
        stage('Install Dependencies') {
            steps {
                echo '==========================='
                echo 'npm install (monorepo root)'
                echo '==========================='
                bat 'npm install'
            }
        }

        // ─────────────────────────────────────────────────────────────
        stage('Build') {
            steps {
                script {
                    env.PROJECTS.split(' ').each { proj ->
                        def app = proj.split(':')[0]
                        echo "--- Building: ${app} ---"
                        bat "npx nx build ${app} --configuration=production"
                    }
                }
            }
        }

        // ─────────────────────────────────────────────────────────────
        stage('Test & Coverage') {
            steps {
                script {
                    env.PROJECTS.split(' ').each { proj ->
                        def app = proj.split(':')[0]
                        echo "--- Testing: ${app} ---"
                        bat """
                        npx nx test ${app} ^
                            --code-coverage ^
                            --watch=false ^
                            --browsers=ChromeHeadlessCI
                        """
                        // Show what was generated
                        bat """
                        echo ==================================
                        echo COVERAGE FILES: ${app}
                        echo ==================================
                        if exist coverage\\apps\\${app} (
                            dir coverage\\apps\\${app} /s
                        ) else (
                            echo Coverage folder not found for ${app}
                        )
                        """
                    }
                }
            }
        }

        // ─────────────────────────────────────────────────────────────
        // Start backend first so automation tests can hit it
        stage('Start Backend') {
            steps {
                echo '==========================='
                echo 'Starting backend server...'
                echo '==========================='
                // Adjust the command/path below to match your actual backend
                // e.g. Spring Boot jar, npm server, or any other process
                bat '''
                start /B "" java -jar backend\\target\\backend.jar ^
                    --server.port=8080 ^
                    > backend-server.log 2>&1
                '''
                // Give the backend time to fully start before automation runs
                sleep(time: 30, unit: 'SECONDS')
                echo 'Backend started — waiting for health check...'
                // Optional: poll /actuator/health until 200 or timeout
                bat '''
                set RETRIES=10
                :WAIT
                curl -s -o nul -w "%%{http_code}" http://localhost:8080/actuator/health | findstr "200" >nul && goto READY
                set /a RETRIES-=1
                if %RETRIES% EQU 0 (echo Backend health check timed out & exit /b 1)
                timeout /t 5 /nobreak >nul
                goto WAIT
                :READY
                echo Backend is healthy.
                '''
            }
        }

        // ─────────────────────────────────────────────────────────────
        stage('ZAP Security Scan') {
            steps {
                script {
                    env.PROJECTS.split(' ').each { proj ->
                        def parts     = proj.split(':')
                        def app       = parts[0]
                        def port      = parts[2]
                        def zapDir    = "${WORKSPACE}\\zap-home-${app}"
                        def zapReport = "${WORKSPACE}\\${app}\\zap-report.html"

                        echo "--- Serving ${app} on port ${port} for ZAP scan ---"
                        // Serve via NX in the background
                        bat "start /B \"\" npx nx serve ${app} --port=${port} --configuration=production"
                        sleep(time: 30, unit: 'SECONDS')

                        echo "--- Running ZAP Scan for ${app} ---"
                        bat """
                        "${ZAP_EXE}" -cmd ^
                          -port 8090 ^
                          -dir "${zapDir}" ^
                          -quickurl http://localhost:${port} ^
                          -quickprogress ^
                          -quickout "${zapReport}" ^
                          -silent || exit 0
                        """

                        echo "--- Stopping NX serve for ${app} ---"
                        bat 'taskkill /F /IM node.exe /T 2>nul || exit 0'
                        sleep(time: 5, unit: 'SECONDS')
                    }
                }
            }
        }

        // ─────────────────────────────────────────────────────────────
        stage('SonarQube Analysis') {
            steps {
                script {
                    env.PROJECTS.split(' ').each { proj ->
                        def parts     = proj.split(':')
                        def app       = parts[0]
                        def sonarKey  = parts[1]

                        echo "--- Sonar Analysis: ${app} ---"

                        withSonarQubeEnv('SonarQube') {
                            def scannerHome = tool 'SonarQubeScanner'
                            bat """
                            "${scannerHome}\\bin\\sonar-scanner.bat" ^
                              -Dsonar.projectKey=${sonarKey} ^
                              -Dsonar.sources=apps/${app}/src ^
                              -Dsonar.exclusions=**/*.spec.ts ^
                              -Dsonar.tests=apps/${app}/src ^
                              -Dsonar.test.inclusions=**/*.spec.ts ^
                              -Dsonar.javascript.lcov.reportPaths=coverage/apps/${app}/lcov.info
                            """
                        }
                    }
                }
            }
        }

        // ─────────────────────────────────────────────────────────────
        stage('Quality Gate') {
            steps {
                echo 'Waiting for SonarQube Quality Gate...'
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: false
                }
            }
        }

        // ─────────────────────────────────────────────────────────────
        stage('Automation Testing') {
            steps {
                echo '==========================='
                echo 'Running Cucumber Automation Tests'
                echo '==========================='
                dir('CucumberFramwork') {
                    bat 'mvn clean test'
                }
            }
        }

        // ─────────────────────────────────────────────────────────────
        stage('Deployment') {
            steps {
                echo '==========================='
                echo 'Deployment Stage'
                echo '==========================='
                echo 'Deployment logic goes here'
            }
        }
    }

    // ─────────────────────────────────────────────────────────────────
    post {

        always {

            echo '--- Stopping backend if still running ---'
            bat '''
            for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8080" ^| findstr "LISTENING"') do (
                taskkill /F /PID %%a 2>nul
            )
            exit 0
            '''

            echo '--- Publishing Coverage Reports ---'
            publishHTML([
                allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true,
                reportDir:   'coverage/apps/shell',
                reportFiles: 'index.html',
                reportName:  'Shell Coverage'
            ])
            publishHTML([
                allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true,
                reportDir:   'coverage/apps/bta-portal',
                reportFiles: 'index.html',
                reportName:  'BTA Portal Coverage'
            ])
            publishHTML([
                allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true,
                reportDir:   'coverage/apps/oms',
                reportFiles: 'index.html',
                reportName:  'OMS Coverage'
            ])

            echo '--- Publishing ZAP Reports ---'
            publishHTML([
                allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true,
                reportDir:   'shell',
                reportFiles: 'zap-report.html',
                reportName:  'Shell ZAP Report'
            ])
            publishHTML([
                allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true,
                reportDir:   'bta-portal',
                reportFiles: 'zap-report.html',
                reportName:  'BTA Portal ZAP Report'
            ])
            publishHTML([
                allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true,
                reportDir:   'oms',
                reportFiles: 'zap-report.html',
                reportName:  'OMS ZAP Report'
            ])

            echo '--- Publishing Allure Report ---'
            script {
                if (fileExists('CucumberFramwork/allure-results')) {
                    try {
                        allure([
                            includeProperties: false,
                            jdk:              '',
                            commandline:      'allure',
                            results:          [[path: 'CucumberFramwork/allure-results']]
                        ])
                    } catch (Exception ex) {
                        echo "Allure generation failed: ${ex.getMessage()}"
                    }
                } else {
                    echo 'No Allure results found. Skipping.'
                }
            }
        }

        success {
            echo '==========================='
            echo 'BUILD PASSED ✅'
            echo '==========================='
        }

        failure {
            echo '==========================='
            echo 'BUILD FAILED ❌'
            echo '==========================='
        }
    }
}
