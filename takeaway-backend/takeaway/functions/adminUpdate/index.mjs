import { db } from '../../services/index.mjs';
import { sendResponse, sendError } from '../../responses/index.mjs';
import middy from '@middy/core';

export const handler = middy(async (event) => {
    try {
        if (!event.body) {
            return sendError(400, { message: 'Ingen data skickades' });
        }

        const { quantity } = JSON.parse(event.body);

        const orderId = event.pathParameters.id;
        if (!orderId) {
            return sendError(400, { message: 'Ingen order ID angiven' });
        }

        if (typeof quantity !== 'number' || quantity < 0) {
            return sendError(400, { message: 'Ogiltigt värde för quantity. Måste vara ett positivt heltal.' });
        }

        const updateExpression = 'set quantity = :quantity';
        const expressionAttributeValues = {
            ':quantity': quantity,
        };

        await db.update({
            TableName: 'HerringOrder',
            Key: { orderId },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ConditionExpression: 'attribute_exists(orderId)', 
        });

        return sendResponse(200, { message: 'Order uppdaterad!', orderId });

    } catch (error) {
        if (error.code === 'ConditionalCheckFailedException') {
            return sendError(404, { message: 'Order med angivet ID hittades inte.' });
        }
        console.error('Fel vid uppdatering av order:', error);
        return sendError(500, { message: 'Kunde inte uppdatera ordern', error: error.message });
    }
});
