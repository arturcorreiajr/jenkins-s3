pipeline{
    agent any

    stages {
        stage('Verify Tools'){
            steps{
                sh '''
                    docker info
                    docker version
                    docker compose version
                '''
            }

        }
        stage('Get Source'){
            steps{
                git url: 'https://github.com/arturcorreiajr/jenkins-s3.git', branch: 'main'
            }

        }
        stage('Docker Build'){
            steps{
                script {
                    dockerapp = docker.build("arturcorreiajunior/backoffice:${env.BUILD_ID}", '-f ./Dockerfile .')
                }
            }
        }
        stage('Docker Push Image'){
            steps{
                script {
                        docker.withRegistry('http://registry.hub.docker.com', 'github-token-jenkins'){
                        dockerapp.push('latest')
                        dockerapp.push("${env.BUILD_ID}")
                    }
                }
            }
        }
        stage('Deploy docker'){
            steps{
                sh 'docker-compose up'
            }

        }
    }
}