var AWS = require("aws-sdk");
var DOC = require("dynamodb-doc");

AWS.config.update({region: "us-west-2"});

exports.handler = function(event, context){
    this.docClient = new DOC.DynamoDB();
    context.done();
}