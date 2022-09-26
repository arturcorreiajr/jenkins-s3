#!groovy
import groovy.json.JsonSlurper
import groovy.json.JsonOutput 

pipeline {
  agent any
    
  tools {
    nodejs 'nodejs'
  }
    
  stages {
        
<<<<<<< HEAD
    stage('Example teste') {
=======
    stage('Example ttt') {
>>>>>>> a7a55ffcb5474b6980b0414360b36e97ac0d81bd
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
