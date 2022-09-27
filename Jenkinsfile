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
            environment = 'BUCKET DO AMBIENTE DE PRODUÇÃO'
          }
          if (environment == 'DEV'){
            environment = 'BUCKET DO AMBIENTE DE DEV'
          }
        }
      }
    }

    stage('output') {
      agent any
      steps {
        script {
          echo "$environment"
        }
      }
    }



  }
}