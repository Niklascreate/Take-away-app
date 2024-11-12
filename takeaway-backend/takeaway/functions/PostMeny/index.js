const { db } = require('../../services/index');
const { v4: uuid } = require('uuid');
const { sendResponse, sendError } = require('../../responses/index');

exports.handler = async (event) => {
  try {
    if (!event.body) {
      return sendError(400, 'Ingen data skickades');
    }

    const menuItems = JSON.parse(event.body);
    if (!Array.isArray(menuItems)) {
      return sendError(400, 'Dataformatet är felaktigt. Förväntad en lista med maträtter.');
    }

    const confirmations = [];

    for (const item of menuItems) {
      try {
        const dish = {
          ...item,
          id: uuid(),
          createdAt: new Date().toISOString(),
        };

        await db.put({
          TableName: 'HerringDB',
          Item: dish,
        });

        confirmations.push({
          id: dish.id,
          dish: dish.dish,
          category: dish.category,
          price: dish.price,
          description: dish.description,
          ingredients: dish.ingredients,
          available: dish.available,
          createdAt: dish.createdAt
        });
      } catch (innerError) {
        console.error(`Fel vid behandling av maträtt ${item.dish}:`, innerError);
      }
    }
    return sendResponse(201, { message: 'Meny tillagd!' });
  } catch (error) {
    console.error('Fel vid sparande av meny till DynamoDB:', error);
    return sendError(500, { message: 'Kunde inte spara menyn', error: error.message });
  }
};


// Författare: Niklas, Rindert, Jonas