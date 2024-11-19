import { db }  from '../../services/index.mjs';
import { v4 as uuid } from 'uuid';
import { sendResponse, sendError } from '../../responses/index.mjs';

export const handler = async (event) => {
  try {
    const items = JSON.parse(event.body);
    const confirmations = [];

    for (const item of items) {
      const dish = {
        id: uuid().slice(0, 4),
        name: item.dish,
        description: item.description,
        price: item.price,
        ingredients: item.ingredients,
        available: item.available,
        createdAt: new Date().toISOString(),
        imageUrl: item.imageUrl || null,
      };

      try {
        await db.put({
          TableName: 'HerringDB',
          Item: dish,
        });

        confirmations.push({
          id: dish.id,
          name: dish.name,
          description: dish.description,
          price: dish.price,
          ingredients: dish.ingredients,
          available: dish.available,
          createdAt: dish.createdAt,
          imageUrl: dish.imageUrl,
        });
      } catch (innerError) {
        console.error(`Fel vid behandling av maträtt ${item.name}:`, innerError);
      }
    }

    return sendResponse(201, { message: 'Meny tillagd!', data: confirmations });
  } catch (error) {
    console.error('Fel vid sparande av meny till DynamoDB:', error);
    return sendError(500, { message: 'Kunde inte spara menyn', error: error.message });
  }
};

//Författare: Niklas
//En funktion som skapar en databas innehållandes en meny på DynamoDb.

//Bugfix: Jonas
//Lagt till stöd för bild-URL från en S3-bucket, vilket gör det möjligt att spara bilder direkt från en bucket.