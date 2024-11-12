const { db } = require('../../services/index');
const { sendResponse, sendError } = require('../../responses/index');
const { v4: uuid } = require('uuid');

async function getDishDetails(id) {
    try {
        const result = await db.get({
            TableName: 'HerringDB',
            Key: { id }
        });

        if (!result.Item) {
            console.error(`Maträtt med ID ${id} hittades inte`);
            return null;
        }
        return result.Item;
    } catch (error) {
        console.error(`Fel vid hämtning av maträtt ${id}:`, error);
        return null;
    }
}

exports.handler = async (event) => {
    try {
        if (!event.body) {
            return sendError(400, 'Ingen data skickades');
        }

        const orders = JSON.parse(event.body);

        if (!Array.isArray(orders) || orders.length === 0) {
            return sendError(400, 'Förväntar en lista med beställningar');
        }

        const confirmations = [];

        for (const orderData of orders) {
            const { id, customerName, email, quantity, specialRequests } = orderData;

            if (!id || !customerName || !email || !quantity) {
                console.error('Saknar nödvändig information:', orderData);
                continue;
            }

            const dishDetails = await getDishDetails(id);

            if (!dishDetails) {
                console.error(`Maträtt med ID ${id} kunde inte hittas`);
                continue;
            }

            const order = {
                orderId: uuid(),
                dishId: id,
                dishName: dishDetails.dish,
                category: dishDetails.category,
                description: dishDetails.description,
                price: dishDetails.price,
                customerName,
                email,
                quantity,
                specialRequests: specialRequests || '',
                createdAt: new Date().toISOString(),
            };

            await db.put({
                TableName: 'HerringBooking',
                Item: order,
            }).promise();

            confirmations.push({
                orderId: order.orderId,
                dishName: order.dishName,
                category: order.category,
                description: order.description,
                price: order.price,
                customerName: order.customerName,
                email: order.email,
                quantity: order.quantity,
                specialRequests: order.specialRequests,
                createdAt: order.createdAt,
            });
        }

        if (confirmations.length === 0) {
            console.error('Inga giltiga beställningar kunde behandlas');
            return sendError(400, 'Inga giltiga beställningar kunde behandlas');
        }

        return sendResponse(201, {
            message: 'Beställningar mottagna!',
            data: confirmations,
        });

    } catch (error) {
        console.error('Fel vid hantering av beställningar:', error);
        return sendError(500, { message: 'Kunde inte bearbeta beställningarna', error: error.message });
    }
};
