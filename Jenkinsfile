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
          if (env.BRANCH_NAME == 'qa'){ 
            echo 'Hello from main branch'
          }
          if (env.BRANCH_NAME == 'dev'){
            echo 'Hello from null branch'
          }
          else {
              sh "echo 'Hello from ${env.BRANCH_NAME} branch!'"
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