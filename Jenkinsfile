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
            parameters: [string(defaultValue: 'DEV', name: 'DEV - PROD', trim: true)]
          )
        }
      }
    }

    stage('Hello') {
      steps {
        script {
          if (environment == 'PROD'){ 
            environment = 'Não faz cagada!'
          }
          if (environment == 'DEV'){
            environment = 'Vai dar cagada!'
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