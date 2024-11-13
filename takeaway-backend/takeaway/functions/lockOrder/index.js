const { DynamoDBClient, UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const { sendResponse, sendError } = require('../../responses/index');

const db = new DynamoDBClient({ region: 'eu-north-1' });

exports.handler = async (event) => {
    try {
        
        const { orderId } = JSON.parse(event.body || '{}');
        if (!orderId) return sendError(400, 'OrderId krävs');

        // Uppdatera fältet isLocked till true i ett enda steg
        const result = await db.send(new UpdateItemCommand({
            TableName: 'HerringOrder',
            Key: { orderId: { S: orderId } },
            UpdateExpression: 'SET #isLocked = :isLocked',
            ExpressionAttributeNames: { '#isLocked': 'isLocked' },
            ExpressionAttributeValues: { ':isLocked': { BOOL: true } },
            ConditionExpression: 'attribute_not_exists(isLocked) OR isLocked = :false', // Förhindra uppdatering om redan låst
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
};
