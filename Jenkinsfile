pipeline{
    agent any

    stages {
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
                script {
                    echo "arturcorreiajunior/backoffice:${env.BUILD_ID}"
                    sh "docker stop backoffice || true && docker rm backoffice || true"
                    sh "docker run --name backoffice -d -p 8081:8081 arturcorreiajunior/backoffice:${env.BUILD_ID}"
                }
            }

        }
    }
}