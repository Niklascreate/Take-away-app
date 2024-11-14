const AWS = require('aws-sdk');
const { sendResponse, sendError } = require('../../responses/index');

const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    if (!event.body) {
      return sendError(400, { message: 'Ingen data skickades' });
    }

    const { orderId, comment } = JSON.parse(event.body);

    if (!orderId || !comment) {
      return sendError(400, { message: 'OrderId och kommentar måste anges' });
    }

    
    const params = {
      TableName: 'HerringOrder',
      Key: { orderId },
      UpdateExpression: 'SET #cmnt = :comment',
      ExpressionAttributeNames: {
        '#cmnt': 'comment'
      },
      ExpressionAttributeValues: {
        ':comment': comment
      },
      ReturnValues: 'ALL_NEW'
    };

    const result = await db.update(params).promise();

    return sendResponse(200, { message: 'Kommentar tillagd', updatedOrder: result.Attributes });
  } catch (error) {
    console.error('Fel vid uppdatering av beställning:', error);
    return sendError(500, { message: 'Intern serverfel', error: error.message });
  }
};

//Rindert
// lägga till en kommentar till kocken för varje beställning, t.ex. om allergier eller specialönskemål.