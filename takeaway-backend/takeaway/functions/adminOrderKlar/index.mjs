import { db } from '../../services/index.mjs';
import { sendResponse, sendError } from '../../responses/index.mjs';
import { validateAdmin } from '../../middlewares/validateAdmin.mjs'
import middy from '@middy/core';

export const handler = middy(async (event) => {
    try {
        const { orderId, status } = JSON.parse(event.body || '{}');
        if (!orderId || !status) return sendError(400, 'OrderId och status krävs');

        const item = await db.get({
            TableName: 'HerringOrder',
            Key: { orderId },
        });

        if (!item.Item) return sendError(404, 'Beställning ej hittad');

        await db.update({
            TableName: 'HerringOrder',
            Key: { orderId },
            UpdateExpression: 'SET #status = :status',
            ExpressionAttributeNames: { '#status': 'status' },
            ExpressionAttributeValues: { ':status': status },
        });

        return sendResponse(200, { message: 'Status uppdaterad', orderId, status });

    } catch (error) {
        console.error('Fel vid uppdatering:', error);
        return sendError(500, 'Kunde inte uppdatera status');
    }
}).use(validateAdmin());