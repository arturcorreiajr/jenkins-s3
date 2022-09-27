#!groovy
import groovy.json.JsonSlurper
import groovy.json.JsonOutput

pipeline {
    agent any
    tools {
        nodejs 'nodejs'
    }

    options {
        ansiColor('xterm')
    skipDefaultCheckout true
    }


//        awsAccessKey = credentials('jenkins-aws-secret-key-id')
//        awsSecretKey = credentials('jenkins-aws-secret-access-key')

    }
    stages {

    stage('Build') {
      steps {
        sh 'npm install '
        sh 'npm run build-qa '
      }
    }
    stage('Sync') {
      steps{
        sh 'cd ./dist/ '
        sh 'pwd'
        sh 'aws s3 sync . s3://influencers-backoffice-app-qa.gotchosen.com/ --delete '
      }
    }
  }
}