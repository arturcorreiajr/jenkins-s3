//Jenkins file only to tutorial example
pipeline {
  agent any
    
  tools {nodejs "node"}
    
  stages {
        
    stage('Example') {
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
