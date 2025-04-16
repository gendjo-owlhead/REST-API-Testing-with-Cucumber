pipeline {
    agent any
    
    environment {
        NODE_VERSION = '20.11.1'
        NVM_DIR = "${env.HOME}/.nvm"
        WORKSPACE_DIR = 'rest-api-testing'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node.js') {
            steps {
                sh '''
                    # Backup and remove existing .npmrc if it exists
                    if [ -f "$HOME/.npmrc" ]; then
                        mv "$HOME/.npmrc" "$HOME/.npmrc.backup"
                    fi
                    
                    # Install nvm if not already installed
                    if [ ! -d "$HOME/.nvm" ]; then
                        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
                    fi
                    
                    # Load nvm
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    
                    # Install Node.js
                    nvm install ${NODE_VERSION}
                    nvm use ${NODE_VERSION}
                    
                    # Verify installation
                    node -v
                    npm -v
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                dir(WORKSPACE_DIR) {
                    sh '''
                        # Load nvm and use the installed Node.js version
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}
                        
                        npm install
                    '''
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir(WORKSPACE_DIR) {
                    sh '''
                        # Load nvm and use the installed Node.js version
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}
                        
                        npm run test
                    '''
                }
            }
        }

        stage('Publish Report') {
            steps {
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: "${WORKSPACE_DIR}/reports/html",
                    reportFiles: 'index.html',
                    reportName: 'Cucumber Test Report',
                    reportTitles: ''
                ])
            }
        }
    }

    post {
        always {
            sh '''
                # Restore .npmrc if it was backed up
                if [ -f "$HOME/.npmrc.backup" ]; then
                    mv "$HOME/.npmrc.backup" "$HOME/.npmrc"
                fi
            '''
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