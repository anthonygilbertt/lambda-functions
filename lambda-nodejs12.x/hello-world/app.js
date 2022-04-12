// Loads in the AWS SDK
const AWS = require("aws-sdk");
const https = require("https");

let url = "https://static-website-anthony.s3.amazonaws.com/index.html";
// Creates the document client specifing the region
// The tutorial's table is 'in us-east-1'
const ddb = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

// exports.handler = async (event, context, callback) => {
//   // Captures the requestId from the context message
//   const requestId = context.awsRequestId;
//   // const name =  context.userName;
//   // const email =  context.userEmail;
//   console.log(context);

//   // // Handle promise fulfilled/rejected states
//   await createMessage(requestId)
//     .then(() => {
//       callback(null, {
//         statusCode: 201,
//         body: "",
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//         },
//       });
//     })
//     .catch((err) => {
//       console.error(err);
//     });

//   // https
//   //   .get(url, (res) => {
//   //     callback(null, res);
//   //     callback(null, {
//   //       statusCode: 201,
//   //       body: "",
//   //       headers: {
//   //         "Access-Control-Allow-Origin": "*",
//   //       },
//   //     });
//   //     console.log("resp.data: ", res.data);
//   //     // console.log(callback)
//   //   })
//   //   .on("error", (e) => {
//   //     callback(Error(e));
//   //   });
// };

exports.handler = async (event, context, callback) => {
  // Captures the requestId from the context message
  const requestId = context.awsRequestId;
  const name = context.userName;
  const email = context.userEmail;

  // Handle promise fulfilled/rejected states
  await createMessage(requestId)
    .then(() => {
      callback(null, {
        statusCode: 201,
        body: event,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

// Function createMessage
// Writes message to DynamoDb table Message
function createMessage(requestId, name, email) {
  const params = {
    TableName: "User",
    Item: {
      userId: requestId,
      name: "name1",
      email: "email1@email.com",
    },
  };
  return ddb.put(params).promise();
}

/*
 * THIS SOLUTION IS SOME BULLSHIT THAT I FOUND ON A YOUTUBE PAGE(might try to hack on this)
 */
// exports.handler = async (event, context, callback) => {
//     var headers = event.headers;
//     var queryStringParameters = event.queryStringParameters;
//     var stageVariables = event.stageVariables;
//     var authResponse = {};
//     if (headers.header1 === "headerValue1"
//     && queryStringParameters.querystring1 === "queryValue1"
//     && stageVariables.stagevariable1 === "stageValue1") {
//     callback(null, generatePolicy('user', 'Allow', event.methodArn));
//     }
//     }
//     var generatePolicy = function(principalid, effect, resource) {
//     var authResponse = {}
//     authResponse.principalid = principalid;
//     if (effect && resource) {
//         var policyDocument = {};
//         policyDocument.Version = '2012-10-17'; // default version
//         policyDocument.Statement = [];
//         var statementOne = {};
//         statementOne.Action = 'execute-api:Invoke'; // default action
//         statementOne.Effect = effect;
//         statementOne.Resource = resource;
//         policyDocument.Statement[0] = statementOne;
//         authResponse.policyDocument = policyDocument;
//     }
//     return authResponse;
// }
