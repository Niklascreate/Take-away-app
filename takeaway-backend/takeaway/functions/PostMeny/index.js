const { db } = require('../../services/index');
const { v4: uuid } = require('uuid');
const { sendResponse, sendError } = require('../../responses/index');

exports.handler = async (event) => {
  try {
    const items = JSON.parse(event.body);
    const confirmations = [];

    for (const item of items) {
      const dish = {
        id: uuid().slice(0, 4),
        name: item.name,
        description: item.description,
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
