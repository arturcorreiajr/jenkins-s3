#!groovy
import groovy.json.JsonSlurper
import groovy.json.JsonOutput

pipeline {
    agent any


//    tools {nodejs "nodejs"}

    stages {
      stage('check') {
        steps {
          sh 'echo $USER'
        }
      }
      stage('Build') {
        steps {
          sh 'npm -version '
          sh 'npm install '
          sh 'npm run build-qa '
        }
      }
      stage('Sync') {
        steps{
          sh 'cd ./dist/ '
          sh 'pwd'
          sh 'aws s3 sync . s3://buckets3/ --delete '
        }
      }
    }
}