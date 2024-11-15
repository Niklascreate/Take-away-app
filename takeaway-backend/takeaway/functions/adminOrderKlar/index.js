const { DynamoDBClient, GetItemCommand, UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const { sendResponse, sendError } = require('../../responses/index');

const db = new DynamoDBClient({ region: 'eu-north-1' });

exports.handler = async (event) => {
    try {
        const { orderId, status } = JSON.parse(event.body || '{}');
        if (!orderId || !status) return sendError(400, 'OrderId och status krävs');

        const { Item } = await db.send(new GetItemCommand({
            TableName: 'HerringOrder',
            Key: { orderId: { S: orderId } },
        }));
        if (!Item) return sendError(404, 'Beställning ej hittad');

    
        await db.send(new UpdateItemCommand({
            TableName: 'HerringOrder',
            Key: { orderId: { S: orderId } },
            UpdateExpression: 'SET #status = :status',
            ExpressionAttributeNames: { '#status': 'status' },
            ExpressionAttributeValues: { ':status': { S: status } },
        }));

        return sendResponse(200, { message: 'Status uppdaterad', orderId, status });

    } catch (error) {
        console.error('Fel vid uppdatering:', error);
        return sendError(500, 'Kunde inte uppdatera status');
    }
};

//Rindert
//Kocken kan ta en Order och markera den som klar.

