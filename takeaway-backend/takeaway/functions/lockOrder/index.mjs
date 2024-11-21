import { UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { sendResponse, sendError } from '../../responses/index.mjs';
import { db } from '../../services/index.mjs';
import middy from '@middy/core';
import { validateToken } from '../../middlewares/validateToken.mjs';

export const handler = middy(async (event) => {
    try {
        const { orderId } = JSON.parse(event.body || '{}');
        if (!orderId) return sendError(400, 'OrderId krävs');

        const result = await db.send(new UpdateItemCommand({
            TableName: 'HerringOrder',
            Key: { orderId: { S: orderId } },
            UpdateExpression: 'SET #isLocked = :isLocked',
            ExpressionAttributeNames: { '#isLocked': 'isLocked' },
            ExpressionAttributeValues: { ':isLocked': { BOOL: true } },
            ConditionExpression: 'attribute_not_exists(isLocked) OR isLocked = :false',
            ExpressionAttributeValues: { ':isLocked': { BOOL: true }, ':false': { BOOL: false } },
        }));

        return sendResponse(200, { message: 'Beställningen är nu låst', orderId });
    } catch (error) {
        if (error.name === 'ConditionalCheckFailedException') {
            return sendError(400, 'Beställningen är redan låst');
        }
        console.error('Fel vid låsning av beställning:', error);
        return sendError(500, 'Kunde inte låsa beställningen');
    }
}).use(validateToken());

//Rindert
//Den här koden låser en order i DynamoDB om den inte redan är låst. Om ordern redan är låst får användaren ett felmeddelande om detta.