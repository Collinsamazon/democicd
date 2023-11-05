import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import { CodePipeline } from 'aws-cdk-lib/aws-events-targets';
import { CodePipelineSource } from 'aws-cdk-lib/pipelines';
import * as pipelines from 'aws-cdk-lib/pipelines'
import { ShellStep, CodePipeline } from 'aws-cdk-lib/pipelines';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class DemocicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // AWS CI-CD Pipeline
    const democicdpipeline = new CodePipeline(this, 'demopipeline', {
      synth: new ShellStep('Synth', {
        // Use a connection created using the AWS console to authenticate to GitHub
        // Other sources are available.
        input: CodePipelineSource.gitHub('Collinsamazon/democicd', 'main'),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
      }),
    });

    }
}
      
