pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        timeout(time: 60, unit: 'MINUTES')
    }

    tools {
        nodejs 'NodeJS-20'
        maven  'MAVEN_HOME'
    }

    environment {
        SONAR_HOST_URL      = 'http://localhost:9000'
        NX_ROOT             = "${WORKSPACE}"
        PROJECTS            = 'shell:amex-shell:4200 bta-portal:amex-bta-portal:4203 oms:amex-oms:4201'
        ZAP_EXE             = 'C:\\Program Files\\ZAP\\Zed Attack Proxy\\zap.bat'
        // Name of the downstream Jenkins job (Jenkinsfile.automation). Update to match your job name.
        AUTOMATION_JOB      = 'AMEX-Automation-Pipeline'
        SHELL_URL           = 'http://localhost:4200'
        GATEWAY_URL          = 'http://localhost:8080'
    }

    stages {

        stage('Checkout') {
            steps {
                cleanWs()
                echo '=========================== Checking out code... ==========================='
                checkout scm
            }
        }

        stage('Pre-clean Ports') {
            // Kill anything left over from a previous failed/aborted run BEFORE we start,
            // not just after — avoids "address already in use" failures on rerun.
            steps {
                bat '''
                for %%P in (4873 8761 8081 8082 8080 4200 4201 4203) do (
                    for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":%%P" ^| findstr "LISTENING"') do (
                        taskkill /F /PID %%a 2>nul
                    )
                )
                exit 0
                '''
            }
        }

        stage('Start Verdaccio') {
            // Verdaccio is not a standing service on this agent (unlike your dev machine),
            // so the pipeline has to start it itself before anything can install or publish.
            steps {
                echo '=========================== Starting Verdaccio (4873)... ==========================='
                bat 'start "verdaccio" /B npx verdaccio --listen 4873 > verdaccio.log 2>&1'

                bat '''
                setlocal enabledelayedexpansion
                set RETRIES=15
                :WAIT_VERDACCIO
                curl -s -o nul -w "%%{http_code}" http://localhost:4873/ > verdaccio_status.txt
                set /p STATUS=<verdaccio_status.txt
                if "!STATUS!"=="200" goto VERDACCIO_READY
                set /a RETRIES-=1
                if !RETRIES! EQU 0 (
                    echo ERROR: Verdaccio did not come up on port 4873 in time.
                    type verdaccio.log 2>nul
                    exit /b 1
                )
                ping -n 3 127.0.0.1 >nul
                goto WAIT_VERDACCIO
                :VERDACCIO_READY
                echo Verdaccio is reachable.
                endlocal
                '''
            }
        }

        stage('Publish Shared UI Library') {
            steps {
                echo '=========================== Publishing @ui-components/ui to Verdaccio... ==========================='
                dir('apps/ui-components') {
                    bat 'npm run ui:publish'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Frontend') {
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
                    }
                }
            }
        }

        stage('Build & Start Backend') {
            steps {
                echo '=========================== Building backend (Maven multi-module)... ==========================='
                dir('Backend') {
                    bat 'mvn clean install -DskipTests'
                }

                echo '=========================== Starting Eureka (8761)... ==========================='
                dir('Backend\\eureka\\target') {
                    bat '''
                    for %%f in (*.jar) do (
                        start "" /B java -jar "%%f" > ..\\..\\..\\eureka-server.log 2>&1
                    )
                    '''
                }
                sleep(time: 25, unit: 'SECONDS')

                echo '=========================== Starting Auth Service (8081)... ==========================='
                dir('Backend\\auth-service\\target') {
                    bat '''
                    for %%f in (*.jar) do (
                        start "" /B java -jar "%%f" > ..\\..\\..\\auth-service.log 2>&1
                    )
                    '''
                }
                sleep(time: 20, unit: 'SECONDS')

                echo '=========================== Starting Wearables Backend (8082)... ==========================='
                dir('Backend\\wearables-springboot-backend\\target') {
                    bat '''
                    for %%f in (*.jar) do (
                        start "" /B java -jar "%%f" > ..\\..\\..\\wearables-backend.log 2>&1
                    )
                    '''
                }
                sleep(time: 20, unit: 'SECONDS')

                echo '=========================== Starting API Gateway (8080)... ==========================='
                dir('Backend\\apigateway\\target') {
                    bat '''
                    for %%f in (*.jar) do (
                        start "" /B java -jar "%%f" > ..\\..\\..\\apigateway.log 2>&1
                    )
                    '''
                }
                sleep(time: 25, unit: 'SECONDS')

                echo 'Checking gateway health...'
                bat '''
                setlocal enabledelayedexpansion
                set RETRIES=10
                :WAIT
                curl -s -o nul -w "%%{http_code}" http://localhost:8080/actuator/health > health_status.txt
                set /p STATUS=<health_status.txt
                if "!STATUS!"=="200" goto READY
                set /a RETRIES-=1
                if !RETRIES! EQU 0 (
                    echo Backend health check timed out.
                    echo --- eureka-server.log ---
                    type eureka-server.log 2>nul
                    echo --- auth-service.log ---
                    type auth-service.log 2>nul
                    echo --- wearables-backend.log ---
                    type wearables-backend.log 2>nul
                    echo --- apigateway.log ---
                    type apigateway.log 2>nul
                    exit /b 1
                )
                ping -n 6 127.0.0.1 >nul
                goto WAIT
                :READY
                echo Backend gateway is healthy.
                endlocal
                '''
            }
        }

        stage('ZAP Security Scan') {
            steps {
                script {
                    env.PROJECTS.split(' ').each { proj ->
                        def parts     = proj.split(':')
                        def app       = parts[0]
                        def port      = parts[2]
                        def zapDir    = "${WORKSPACE}\\zap-home-${app}"
                        def zapReport = "${WORKSPACE}\\zap-reports\\${app}-zap-report.html"

                        echo "--- Serving ${app} on port ${port} for ZAP scan ---"
                        bat "start \"${app}-zap-serve\" /B npx nx serve ${app} --port=${port} --configuration=production"
                        sleep(time: 30, unit: 'SECONDS')

                        bat """
                        "${ZAP_EXE}" -cmd ^
                          -port 8090 ^
                          -dir "${zapDir}" ^
                          -quickurl http://localhost:${port} ^
                          -quickprogress ^
                          -quickout "${zapReport}" ^
                          -silent || exit 0
                        """

                        bat """
                        for /f \"tokens=5\" %%a in ('netstat -aon ^| findstr \":${port}\" ^| findstr \"LISTENING\"') do (
                            taskkill /F /PID %%a 2>nul
                        )
                        exit 0
                        """
                        sleep(time: 5, unit: 'SECONDS')
                    }
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    env.PROJECTS.split(' ').each { proj ->
                        def parts    = proj.split(':')
                        def app      = parts[0]
                        def sonarKey = parts[1]

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

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: false
                }
            }
        }

        stage('Serve Apps for Automation') {
            // These are the SAME app instances that stay up for the automation job —
            // no separate "serve for zap" vs "serve for tests" drift.
            steps {
                script {
                    env.PROJECTS.split(' ').each { proj ->
                        def parts = proj.split(':')
                        def app   = parts[0]
                        def port  = parts[2]
                        echo "--- Serving ${app} on port ${port} ---"
                        bat "start \"${app}-serve\" /B npx nx serve ${app} --port=${port} --configuration=production > ${app}-serve.log 2>&1"
                    }
                }
                script {
                    env.PROJECTS.split(' ').each { proj ->
                        def parts = proj.split(':')
                        def app   = parts[0]
                        def port  = parts[2]
                        bat """
                        setlocal enabledelayedexpansion
                        set RETRIES=20
                        :WAIT_${app}
                        curl -s -o nul -w "%%{http_code}" http://localhost:${port} > ${app}_status.txt
                        set /p STATUS=<${app}_status.txt
                        if "!STATUS!"=="200" goto READY_${app}
                        set /a RETRIES-=1
                        if !RETRIES! EQU 0 (
                            echo ${app} did not come up on port ${port} in time.
                            type ${app}-serve.log 2>nul
                            exit /b 1
                        )
                        ping -n 4 127.0.0.1 >nul
                        goto WAIT_${app}
                        :READY_${app}
                        echo ${app} is serving on ${port}.
                        endlocal
                        """
                    }
                }
            }
        }

        stage('Trigger Automation Pipeline') {
            // Hands off to the dedicated automation job instead of running Cucumber inline.
            // wait:true + propagate:true means this build fails if automation fails.
            steps {
                script {
                    def automationBuild = build job: env.AUTOMATION_JOB,
                        parameters: [
                            string(name: 'BASE_URL',     value: env.SHELL_URL),
                            string(name: 'BACKEND_URL',  value: env.GATEWAY_URL),
                            string(name: 'TRIGGERED_BY', value: "main-pipeline-#${env.BUILD_NUMBER}")
                        ],
                        wait: true,
                        propagate: true

                    echo "Automation pipeline finished with result: ${automationBuild.getResult()}"
                }
            }
        }

        stage('Deployment') {
            steps {
                echo '=========================== Deployment Stage ==========================='
                echo 'Deployment logic goes here (e.g. docker build/push, artifact upload, etc.)'
            }
        }
    }

    post {
        always {
            echo '--- Stopping backend and frontend servers ---'
            bat '''
            for %%P in (4873 8761 8081 8082 8080 4200 4201 4203) do (
                for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":%%P" ^| findstr "LISTENING"') do (
                    taskkill /F /PID %%a 2>nul
                )
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
                reportDir:   'zap-reports',
                reportFiles: 'shell-zap-report.html',
                reportName:  'Shell ZAP Report'
            ])
            publishHTML([
                allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true,
                reportDir:   'zap-reports',
                reportFiles: 'bta-portal-zap-report.html',
                reportName:  'BTA Portal ZAP Report'
            ])
            publishHTML([
                allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true,
                reportDir:   'zap-reports',
                reportFiles: 'oms-zap-report.html',
                reportName:  'OMS ZAP Report'
            ])
        }

        success {
            echo '=========================== BUILD PASSED ✅ ==========================='
        }

        failure {
            echo '=========================== BUILD FAILED ❌ ==========================='
        }
    }
}
