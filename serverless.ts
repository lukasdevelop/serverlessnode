import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'serverlessnode',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild',"serverless-dynamodb-local", 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: "20201221",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["dynamodb:*"],
        Resource: ["*"],
      }
    ]
  },
  // import the function via paths
  functions:{
    createEmployee: {
      handler: "src/functions/createEmployee.handler",
      events: [
        {
          http: {
            path: "createEmployee",
            method: "post",
            cors: true
          }
        }
      ]
    },
    listEmployeeById: {
      handler: "src/functions/listEmployeeById.handler",
      events: [
        {
          http: {
            path: "listEmployeeById/{id}",
            method: "get",
            cors: true
          }
        }
      ]
    },
    listAllEmployees: {
      handler: "src/functions/listAllEmployees.handler",
      events: [
        {
          http: {
            path: "listAllEmployees",
            method: "get",
            cors: true
          }
        }
      ]
    },
    updateEmployee: {
      handler: "src/functions/updateEmployee.handler",
      events: [
        {
          http: {
            path: "updateEmployee/{id}",
            method: "put",
            cors: true
          }
        }
      ]
    },
    deleteEmployee: {
      handler: "src/functions/deleteEmployee.handler",
      events: [
        {
          http: {
            path: "deleteEmployee/{id}",
            method: "delete",
            cors: true
          }
        }
      ]
    }
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb:{
      stages: ["dev", "local"],
      start: {
        port: 8000,
        inMemory: true,
        migrate: true
      },
    },
  },
  resources: {
    Resources: {
      dbEmployees: {
        Type: "AWS::DynamoDB::Table",
        Properties:{
          TableName: "employees",
          ProvisionedThroughput: {
            ReadCapacityUnits: 3,
            WriteCapacityUnits: 3
          },
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S"
            }
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH"
            }
          ]
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
