def env = null

pipeline {
  agent none
  stages {
    stage('Set Environment') {
      steps {
        script {
          nome = input (
            message: 'Selecione o ambiente?',
            ok: 'Ok', 
            parameters: [string(defaultValue: 'Prod', name: 'Environment', trim: true)]
          )
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