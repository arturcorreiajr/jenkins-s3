def environment = null
def i = false

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
          while(!i){
            if (environment == 'PROD'){ 
              environment = 'BUCKET DO AMBIENTE DE PRODUÇÃO'
              i = true
            }else if (environment == 'DEV'){
              environment = 'BUCKET DO AMBIENTE DE DEV'
              i = true
            } else {
              i = false
            }
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