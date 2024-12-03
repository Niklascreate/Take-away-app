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
    console.log('Event mottaget:', event);

    try {
        if (!event.body) {
            return sendError(400, 'Ingen data skickades');
        }

        const orderData = JSON.parse(event.body);
        console.log('Orderdata:', orderData);

        if (!Array.isArray(orderData.order)) {
            return sendError(400, 'Order måste vara en lista.');
        }

        const orderId = generateOrderId();
        const dishes = [];
        let totalPrice = 0;

        for (const item of orderData.order) {
            console.log('Bearbetar maträtt:', item);

            const { id, specialRequests, quantity } = item;

            if (!id || !quantity) {
                console.error('Saknar nödvändig information:', item);
                continue;
            }

            if (!Number.isInteger(quantity) || quantity <= 0) {
                return sendError(400, 'Kvantiteten måste vara ett positivt heltal.');
            }

            const dishDetails = await getDishDetails(id);
            console.log('Hämtade maträttsdetaljer:', dishDetails);

            if (!dishDetails) {
                return sendError(400, `Maträtt med ID ${id} kunde inte hittas`);
            }

            const orderPrice = dishDetails.price * quantity;
            totalPrice += orderPrice;

            const dishId = generateDishId();
            dishes.push({
                id: dishId,
                dishName: dishDetails.name,
                category: dishDetails.category,
                description: dishDetails.description,
                price: dishDetails.price,
                quantity,
                specialRequests: specialRequests || '',
            });

            await db.put({
                TableName: 'HerringOrder',
                Item: {
                    orderId,
                    id: dishId,
                    dishName: dishDetails.name,
                    category: dishDetails.category,
                    description: dishDetails.description,
                    price: dishDetails.price,
                    quantity,
                    specialRequests: specialRequests || '',
                    createdAt: new Date().toISOString(),
                },
            });
        }

        if (dishes.length === 0) {
            return sendError(400, 'Inga giltiga maträtter kunde behandlas');
        }

        await db.put({
            TableName: 'HerringOrder',
            Item: {
                orderId,
                id: 'kunduppgifter',
                customerName: orderData.customerName,
                email: orderData.email,
                phoneNumber: orderData.phoneNumber,
                totalPrice,
                createdAt: new Date().toISOString(),
            },
        });

        return sendResponse(201, {
            message: 'Beställningen mottagen!',
            totalPrice,
            data: { orderId, dishes },
        });
    } catch (error) {
        console.error('Fel vid hantering av beställningen:', error);
        return sendError(500, { message: 'Kunde inte bearbeta beställningen', error: error.message });
    }
};



//Niklas
//Sammanfattningsvis tar denna Lambda-funktion emot en lista med beställningar.
//Validerar mobilnumret, hämtar maträttsinformation från en databas, beräknar totalpriset och sparar beställningarna i en annan databas, innan den returnerar en bekräftelse.