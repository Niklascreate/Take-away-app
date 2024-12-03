import { db } from '../../services/index.mjs';
import { sendResponse, sendError } from '../../responses/index.mjs';
import { v4 as uuid } from 'uuid';


async function getDishDetails(id) {
    try {
        const result = await db.get({
            TableName: 'HerringDB',
            Key: { id }
        });
        return result.Item;
    } catch (error) {
        console.error(`Fel vid hämtning av maträtt ${id}:`, error);
        return null;
    }
}

function generateOrderId() {
    return uuid().replace(/-/g, '').substring(0, 4);
}

function generateDishId() {
    return uuid().replace(/-/g, '').substring(0, 4);
}

export const handler = async (event) => {
    try {
        if (!event.body) {
            return sendError(400, 'Ingen data skickades');
        }

        const orderData = JSON.parse(event.body);

        const confirmations = [];
        let totalPrice = 0;

        const orderId = generateOrderId();

        if (!Array.isArray(orderData.order)) {
            return sendError(400, 'Order måste vara en lista.');
        }

        for (const item of orderData.order) {
            const { id, specialRequests, quantity } = item;

            if (!id || !quantity) {
                console.error('Saknar nödvändig information:', item);
                continue;
            }

            if (!Number.isInteger(quantity) || quantity <= 0) {
                return sendError(400, 'Kvantiteten måste vara ett positivt heltal.');
            }

            const dishDetails = await getDishDetails(id);

            if (!dishDetails) {
                console.error(`Maträtt med ID ${id} kunde inte hittas`);
                continue;
            }

            const orderPrice = dishDetails.price * quantity;
            totalPrice += orderPrice;

            const dishId = generateDishId();

            const orderItem = {
                id: dishId,
                orderId: orderId,
                dishName: dishDetails.name,
                category: dishDetails.category,
                description: dishDetails.description,
                price: dishDetails.price,
                quantity,
                specialRequests: specialRequests || '',
            };

            confirmations.push(orderItem);
        }

        if (confirmations.length === 0) {
            return sendError(400, 'Inga giltiga maträtter kunde behandlas');
        }

        try {
            for (const item of confirmations) {
                // Spara varje maträtt som ett separat objekt
                await db.put({
                    TableName: 'HerringOrder',
                    Item: {
                        orderId: orderId, // Partition Key
                        id: item.id, // Sort Key
                        dishName: item.dishName,
                        category: item.category,
                        description: item.description,
                        price: item.price,
                        quantity: item.quantity,
                        specialRequests: item.specialRequests,
                        customerName: orderData.customerName,
                        email: orderData.email,
                        phoneNumber: orderData.phoneNumber,
                        createdAt: new Date().toISOString(),
                    },
                });
            }
        
            return sendResponse(201, {
                message: 'Beställningen mottagen!',
                totalPrice,
                data: { orderId, dishes: confirmations },
            });
        } catch (dbError) {
            console.error('Fel vid sparande av beställning:', dbError);
            return sendError(500, 'Kunde inte spara beställningen');
        }

    } catch (error) {
        console.error('Fel vid hantering av beställningen:', error);
        return sendError(500, { message: 'Kunde inte bearbeta beställningen', error: error.message });
    }
};



//Niklas
//Sammanfattningsvis tar denna Lambda-funktion emot en lista med beställningar.
//Validerar mobilnumret, hämtar maträttsinformation från en databas, beräknar totalpriset och sparar beställningarna i en annan databas, innan den returnerar en bekräftelse.