# Chat App Backend

This is an example architecture using AWS Lambda and PostgreSQL on RDS with NodeJS in TypeScript for a simple chat app backend. The focus is not on the complexity of the actual app, but rather the organization of logic into small testable units and helper functions that make it easy to work with aws lambda with middleware and automatic body parsing.

## Installing

Installing is easy:

```
npm install -g serverless
npm i
```

## Running locally

To run locally, run the following command:

```
npm run offline
```

This will run a `docker-compose up -d` for postgres locally as well as `serverless offline --port 9999`

## Testing locally

Run in your favorite IDE using jest, or type the following:

```
npm run test
```

# Deploying to AWS

Deploying your Lambda to AWS is easy but takes some initial setup for RDS.

## AWS RDS

Create a postgreSQL database on RDS and configure it's VPC settings and master password.

## AWS SSM

The environment variables required can be seen below:

```
PGUSER
PGDATABASE
PGPASSWORD
PGHOST
PGPORT
```

These variables must be stored in SSM as seen in the `serverless.yml` config. Along with these additional security variables:

```
ssm:vpcSecurityGroup
ssm:vpcSubnet1
ssm:vpcSubnet2
```

Setting up each can be done easily via `aws-cli` (https://serverless.com/blog/serverless-secrets-api-keys/):
```
aws ssm put-parameter --name supermanToken --type String --value mySupermanToken
```



## Deploying
Make sure you get AWS connected to serverless and then run the following:
````
npm run deploy
```