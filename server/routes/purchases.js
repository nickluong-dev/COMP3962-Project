const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-west-2",
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = "cloud-project-test";

router.get("/all", async (req, res) => {
  const params = {
    TableName: dynamodbTableName,
  };
  try {
    const allPurchases = await scanDynamoRecords(params, []);
    const body = {
      purchases: allPurchases,
    };
    res.json(body);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  const params = {
    TableName: dynamodbTableName,
    Item: {
      uid: "1000",
      color: "red",
      price: 100,
    },
  };
  await dynamodb
    .put(params)
    .promise()
    .then(
      () => {
        const body = {
          Operation: "SAVE",
          Message: "SUCCESS",
          Item: req.body,
        };
        res.json(body);
      },
      (error) => {
        console.error("Error: ", error);
        res.status(500).send(error);
      }
    );
});

async function scanDynamoRecords(scanParams, array) {
  try {
    const dynamoData = await dynamodb.scan(scanParams).promise();
    array = array.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartKey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(scanParams, array);
    }
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = router;
