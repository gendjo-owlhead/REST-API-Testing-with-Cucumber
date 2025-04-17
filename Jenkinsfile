pipeline {
    agent any
    
    tools {
        nodejs "NodeJS 23"
    }

    environment {
        WORKSPACE_DIR = 'rest-api-testing'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir(WORKSPACE_DIR) {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir(WORKSPACE_DIR) {
                    sh 'npm test'
                }
            }
        }

        stage('Publish Report') {
            steps {
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: "reports/html",
                    reportFiles: 'index.html',
                    reportName: 'Cucumber Test Report',
                    reportTitles: ''
                ])
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Tests completed successfully!'
        }
        failure {
            echo 'Tests failed! Check the report for details.'
        }
    }
}