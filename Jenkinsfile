def env = null

pipeline {
  agent none
  stages {
    stage('Set Environment') {
      steps {
        script {
          env = input (
            message: 'Selecione o ambiente?',
            ok: 'Ok', 
            parameters: [string(defaultValue: 'Prod', name: 'Environment', trim: true)]
          )
        }
      }
    }

    stage('Hello') {
      steps {
        script {
          if (env == 'PROD'){ 
            echo 'Hello PROD'
          }
          if (env.BRANCH_NAME == 'DEV'){
            echo 'Hello DEV'
          }
        }
      }
    }

    stage('output') {
      agent any
      steps {
        script {
          echo "Olá, $env"
        }
      }
    }



  }
}