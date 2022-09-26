//Jenkins file only to tutorial example
pipeline {
  agent any
    
  tools {
    nodejs '16.16.0'
  }
    
  stages {
        
    stage('Example ttt') {
      steps {
        sh 'npm config ls'
      }
    }
  
    stage('Cloning Git') {
      steps {
        git 'https://github.com/arturcorreiajr/jenkins-s3.git'
      }
    }
        
    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }
     
    stage('Test') {
      steps {
         sh 'npm test'
      }
    }      
  }
}
