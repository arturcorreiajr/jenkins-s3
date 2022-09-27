def environment = null

pipeline {
  agent none
  stages {
    stage('Set Environment') {
      steps {
        script {
          environment = input (
            message: 'Selecione o ambiente?',
            ok: 'Ok', 
            parameters: [string(defaultValue: 'Prod', name: 'DEV - PROD', trim: true)]
          )
        }
      }
    }

    stage('Hello') {
      steps {
        script {
          if (environment == 'PROD'){ 
            echo 'Hello PROD'
          }
          if (environment == 'DEV'){
            echo 'Hello DEV'
          }
        }
      }
    }

    stage('output') {
      agent any
      steps {
        script {
          echo "Olá, $environment"
        }
      }
    }



  }
}