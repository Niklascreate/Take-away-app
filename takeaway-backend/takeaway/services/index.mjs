import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDB();
const db = DynamoDBDocument.from(client);

export { db };

// Författare: Niklas, Rindert, Jonas
// Skapar en instans av DynamoDB-klienten och ett DynamoDB Document-klientobjekt från AWS SDK.
