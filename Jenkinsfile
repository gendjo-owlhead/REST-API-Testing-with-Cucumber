pipeline {
    agent {
        docker {
            image 'node:20-alpine'  // Using lightweight Alpine-based Node.js image
            args '-v $HOME/.npm:/root/.npm'  // Cache npm packages
        }
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Generate Report') {
            steps {
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'reports/html',
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