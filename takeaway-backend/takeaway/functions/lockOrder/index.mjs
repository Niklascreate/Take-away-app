import { UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { sendResponse, sendError } from '../../responses/index.mjs';
import { db } from '../../services/index.mjs';
import middy from '@middy/core';

export const handler = middy(async (event) => {
    try {
        const { orderId, lockStatus } = JSON.parse(event.body || '{}');
        if (!orderId || !lockStatus) return sendError(400, 'OrderId och lockStatus krävs');

        // Kontrollera om status är korrekt
        if (lockStatus !== 'locked' && lockStatus !== 'unlocked') {
            return sendError(400, 'Ogiltig lockStatus');
        }

        // Hämta ordren
        const item = await db.get({
            TableName: 'HerringOrder',
            Key: { orderId },
        });

        if (!item.Item) return sendError(404, 'Beställning ej hittad');

        // Om vi ska låsa
        if (lockStatus === 'locked') {
            await db.update({
                TableName: 'HerringOrder',
                Key: { orderId },
                UpdateExpression: 'SET #isLocked = :isLocked',
                ExpressionAttributeNames: { '#isLocked': 'isLocked' },
                ExpressionAttributeValues: { ':isLocked': { BOOL: true } },
            });

            return sendResponse(200, { message: 'Beställningen är nu låst', orderId });
        }

        // Om vi ska låsa upp
        if (lockStatus === 'unlocked') {
            await db.update({
                TableName: 'HerringOrder',
                Key: { orderId },
                UpdateExpression: 'REMOVE #isLocked',
                ExpressionAttributeNames: { '#isLocked': 'isLocked' },
            });

            return sendResponse(200, { message: 'Beställningen är nu upplåst', orderId });
        }

    } catch (error) {
        console.error('Fel vid uppdatering:', error);
        return sendError(500, 'Kunde inte uppdatera status');
    }
});