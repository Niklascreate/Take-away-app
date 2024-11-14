const { DynamoDBClient, UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const { sendResponse, sendError } = require('../../responses/index');

const db = new DynamoDBClient({ region: 'eu-north-1' });

exports.handler = async (event) => {
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
};


//Rindert
//Den här koden låser en order i DynamoDB om den inte redan är låst. Om ordern redan är låst får användaren ett felmeddelande om detta.