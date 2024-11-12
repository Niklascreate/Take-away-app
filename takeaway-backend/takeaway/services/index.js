const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');
const client = new DynamoDB();
const db = DynamoDBDocument.from(client);

module.exports = { db };

// Författare: Niklas, Rindert, Jonas
//Skapar en instans av DynamoDB-klienten och ett DynamoDB Document-klientobjekt från AWS SDK.