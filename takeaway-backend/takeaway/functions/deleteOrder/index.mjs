import { DynamoDBClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { sendResponse, sendError } from '../../responses/index.mjs';

const db = new DynamoDBClient({ region: 'eu-north-1' });

export const handler = async (event) => {
  try {
    const { orderId } = event.queryStringParameters || {};

    if (!orderId) {
      return sendError(400, { message: 'OrderId måste anges' });
    }

    const params = {
      TableName: 'HerringOrder',
      Key: { orderId },
      ConditionExpression: 'attribute_not_exists(isLocked)', 
    };

    await db.send(new DeleteCommand(params));

    return sendResponse(200, { message: 'Beställningen har tagits bort' });
  } catch (error) {
    console.error('Fel vid radering av beställning:', error);

    if (error.name === 'ConditionalCheckFailedException') {
      return sendError(403, { message: 'Beställningen är låst och kan inte tas bort' });
    }

    return sendError(500, { message: 'Intern serverfel', error: error.message });
  }
};