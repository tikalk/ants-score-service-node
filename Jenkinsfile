properties([buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '5')), disableConcurrentBuilds()])

node {
    def workspace = pwd()
    try {
        stage ('Clone') {
        	checkout scm
        }
      	stage ('Deploy') {
      	    sh "serverless deploy"
      	}
    } catch (err) {
        currentBuild.result = 'FAILED'
        throw err
    }

}