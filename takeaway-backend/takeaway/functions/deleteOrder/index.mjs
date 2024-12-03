import { DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { db } from '../../services/index.mjs';
import { sendResponse, sendError } from '../../responses/index.mjs';
import middy from '@middy/core';

export const handler = middy(async (event) => {
  try {
    const { orderId, id } = event.pathParameters || {}; 

    if (!orderId || !id) {
      return sendError(400, { message: 'Både orderId och id för maträtten måste anges' });
    }

    const params = {
      TableName: 'HerringOrder',
      Key: { orderId, id },
      ConditionExpression: 'attribute_not_exists(isLocked)', 
    };

    await db.send(new DeleteCommand(params)); 

    return sendResponse(200, { message: 'Maträtten har tagits bort' });
  } catch (error) {
    console.error('Fel vid hantering av radering:', error);

    if (error.name === 'ConditionalCheckFailedException') {
      return sendError(403, { message: 'Maträtten är låst och kan inte tas bort' });
    }

    return sendError(500, { message: 'Intern serverfel', error: error.message });
  }
});