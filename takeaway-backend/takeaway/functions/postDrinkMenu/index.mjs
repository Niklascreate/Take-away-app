import { db } from '../../services/index.mjs';
import { v4 as uuid } from 'uuid';
import { sendResponse, sendError } from '../../responses/index.mjs';

export const handler = async (event) => {
  try {
    const items = JSON.parse(event.body);
    const confirmations = [];

    for (const item of items) {
      const drink = {
        id: uuid().slice(0, 4),
        name: item.drink,
        description: item.description,
        price: item.price,
        category: item.category, 
        available: item.available,
        createdAt: new Date().toISOString(),
        imageUrl: item.imageUrl || null,
      };

      try {
        await db.put({
          TableName: 'HerringDrinkDB',
          Item: drink,
        });

        confirmations.push({ id: drink.id, name: drink.name, description: drink.description, price: item.price, category: drink.category });
      } catch (error) {
        console.error(`Fel vid sparning av dryck: ${item.drink}`, error);
        throw new Error(`Kunde inte lägga till dryck: ${item.drink}`);
      }
    }

    return sendResponse(201, {
      message: 'Drinkmeny tillagd!',
      items: confirmations,
    });
  } catch (error) {
    console.error('Fel vid bearbetning av begäran:', error);
    return sendError(500, 'Ett fel inträffade vid bearbetning av menyn.');
  }
};