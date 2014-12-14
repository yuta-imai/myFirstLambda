# A sample project for AWS Lambda

## Description

This is a sample project for [AWS Lambda](http://aws.amazon.com/lambda/). Goal of the project is to build a pipeline of developing/testing/deploying Lambda function.

## Way of thinking

You would want to develop your function locally, test it and publish it.

In AWS Lambda, we will implement function to be invoked and will have to expose that file and method. For example, if we implement *handler* method in *app.js*, Lambda will call in such way. (Please note that this is observable facts from outside of AWS Lambda, so it is not sure how it works internally.)

```javascript
var yourLambdaFunction = require('./app');
yourLambdaFunction.handler(event,context);
```

So we can write a driver/test code like this.

```javascript
// We will put dummy objects for event and context;
var event = {};
var context = {
  // InvokeID may be unique invocation id for AWS Lambda.
  invokeid: 'string',
  // context.done() should be called for end of each invocation.
  // We would want to stub this.
  done: function(err,data){
    return;
  }
};

// Then we can load and run your function.
var yourLambdaFunction = require('./app');
yourLambdaFunction.handler(event,context);
```

## Package management

As above, we can develop and run/test the function locally. Then we would want to package your function while node.js has pretty good packaging system, npm.

npm has feature for version management, dependencies and package management and some management feature for script files to be able to run.

In this project, I am using npm in ways below.
- Dependencies management
- Script management. The scripts covers,
 - Test locally
 - Initialising config for AWS Lambda
 - Building package for AWS Lambda to be uploaded
 - Uploading a package to AWS Lambda

Using these scripts, we can achieve such pipeline.
1. Develop a function locally.
1. Build and run test locally with **npm test**.
1. Build package to be uploaded with **npm build**.
1. Upload the funciton to AWS Lambda with **npm initLambda** and **npm publish**.

Let's walk through it.
Here is a sample package.json for this project.

```json
{
  "name": "myFirstLambda",
  "version": "0.0.1",
  "private": true,
  "engines" : { "node" : "0.10.32" },
  "main": "app.js",
  "dependencies": {},
  "devDependencies": {
    "aws-sdk":"2.1.2",
    "mocha": "*",
    "eslint": "*",
    "istanbul": "*"
  },
  "scripts" : {
    "test" : "npm -s run-script lint && npm -s run-script unit",
    "unit" : "istanbul `[ $COVERAGE ] && echo 'cover _mocha' || echo 'test mocha'` -- test test/basic",
    "lint" : "eslint ./*.js",
    "initLambda" : "node ./script/initLambda.js",
    "build": "node ./script/build.js",
    "publish": "node ./script/publish.js"
  }
}
```
### Testing/Linting

You can use any testing framework for node.js. In this sample project, I am using istanbul, mocha and eslint.

### Building  

In **build** phase, we have to generate zipped file to be uploaded to AWS Lambda. Please note AWS Lambda has its own 'aws-sdk' so we do not have to upload it by ourselves. In this sample, I am excluding modules in devDependencies when generating zipped file. Zip file structure should be like this.

```bash
sample.zip
  |-app.js
  |-your_library_directory/
  |-node_modules/
```

### Uploading function

Before **Uploading function to AWS Lambda**, we have to collect some configuration items. In this sample project, I am using  *initLambda* script. This will simply generate such file and each items will be used in *publish* script.

```javascript
{
  "region": "",  // AWS Lambda region
  "description": "", // Description for the function
  "role": "", // AWS Lambda execution IAM Role
  "memorySize": "128", // Memory size to be allocated in AWS Lambda
  "timeout": "3", // Timeout for the function in AWS Lambda
  "handlerFile": "", // File name to be invoked in AWS Lambda
  "handlerMethod": "" // Method name to be invoked in AWS Lambda
}
```

Then we can upload the function to AWS Lambda. You can find the sample script [here](script/publish.js).



##  LICENSE

[MIT License](LICENSE)
