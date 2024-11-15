const AWS = require('aws-sdk');
const { sendResponse, sendError } = require('../../responses/index');

const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    // Kontrollera att queryStringParameters är med i förfrågan
    const { orderId } = event.queryStringParameters || {};

    if (!orderId) {
      return sendError(400, { message: 'OrderId måste anges' });
    }

    // Parametrar för att ta bort en order från DynamoDB
    const params = {
      TableName: 'HerringOrder',
      Key: { orderId },
      ConditionExpression: 'attribute_not_exists(isLocked)', 
    };

    // Utför raderingen
    await db.delete(params).promise();

    return sendResponse(200, { message: 'Beställningen har tagits bort' });
  } catch (error) {
    console.error('Fel vid radering av beställning:', error);

    if (error.code === 'ConditionalCheckFailedException') {
      return sendError(403, { message: 'Beställningen är låst och kan inte tas bort' });
    }

    return sendError(500, { message: 'Intern serverfel', error: error.message });
  }
};
