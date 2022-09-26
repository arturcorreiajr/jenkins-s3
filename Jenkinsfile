#!groovy
import groovy.json.JsonSlurper
import groovy.json.JsonOutput 

pipeline {
  agent any
    
  tools {
    nodejs 'nodejs'
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

    stage('Sync') {
      steps{
        sh 'cd ./dist/ '
        sh 'pwd'
        sh 'aws s3 sync . s3://bucket-s3/ --delete '
      }
    }
     
    stage('Test') {
      steps {
         sh 'npm test'
      }
    }      
  }
}
