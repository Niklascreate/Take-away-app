import { GetItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb'; 
import { sendResponse, sendError } from '../../responses/index.mjs';
import { db } from '../../services/index.mjs';
import middy from '@middy/core';

export const handler = middy(async (event) => {
    try {
        const { orderId, id } = JSON.parse(event.body || '{}');
        console.log('Attempting to lock order with orderId:', orderId, 'and id:', id);

        const result = await db.send(new GetItemCommand({
            TableName: 'HerringOrder',
            Key: { 
                orderId: { S: orderId }, 
                id: { S: id } 
            },
        }));
        
        console.log('Current order data:', result.Item);

        if (!orderId || !id) {
            return sendError(400, 'OrderId och id krävs');
        }

        await db.send(new UpdateItemCommand({
            TableName: 'HerringOrder',
            Key: { 
                orderId: { S: orderId },
                id: { S: id }
            },
            UpdateExpression: 'SET #isLocked = :isLocked',
            ExpressionAttributeNames: { '#isLocked': 'isLocked' },
            ExpressionAttributeValues: { ':isLocked': { BOOL: true } },
        }));

        return sendResponse(200, { message: 'Beställningen är nu låst', orderId });
    } catch (error) {
        if (error.name === 'ConditionalCheckFailedException') {
            return sendError(400, 'Beställningen är redan låst');
        }

        console.error('Fel vid låsning av beställning:', error);
        return sendError(500, 'Kunde inte låsa beställningen');
    }
});
