pipeline {
    agent any
    stages {
//        stage('Build') {
//           steps {
//                withCredentials([aws(accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'aws-jenkins-s3', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY')]) {
//                    s3Upload(pathStyleAccessEnabled: true, payloadSigningEnabled: true, file:'index.html', bucket:'jenkins-buckets3')
//                }
//            }  
//        }    
        stage('Upload to AWS') {
            steps {
                withAWS(region:'us-east-1',credentials:'aws-jenkins-s3') {
                sh 'echo "Uploading content with AWS creds"'
                    s3Upload(pathStyleAccessEnabled: true, payloadSigningEnabled: true, file:'index.html', bucket:'jenkins-buckets3')
                }
            }
        }
    }
}

// https://aws.plainenglish.io/step-by-step-approach-using-jenkins-for-file-upload-to-aws-s3-c2f395d01b7d
// https://www.jenkins.io/doc/tutorials/build-a-node-js-and-react-app-with-npm/