const { db } = require('../../services/index');
const { sendResponse, sendError } = require('../../responses/index');
const { v4: uuid } = require('uuid');

// Funktion för att hämta maträttens detaljer från HerringDB
async function getDishDetails(dishId) {
    try {
        const result = await db.get({
            TableName: 'HerringDB',
            Key: { id: dishId }
        }).promise();
        return result.Item;
    } catch (error) {
        console.error(`Fel vid hämtning av maträtt ${dishId}:`, error);
        return null;
    }
}

exports.handler = async (event) => {
    try {
        if (!event.body) {
            return sendError(400, 'Ingen data skickades');
        }

        const orders = JSON.parse(event.body);

        // Kontrollera att vi fått en lista (array) av beställningar
        if (!Array.isArray(orders) || orders.length === 0) {
            return sendError(400, 'Förväntar en lista med beställningar');
        }

        const confirmations = [];

        // Loopar igenom varje beställning och behandlar den
        for (const orderData of orders) {
            const { dishId, customerName, email, quantity, specialRequests } = orderData;

            // Validera att nödvändiga fält finns
            if (!dishId || !customerName || !email || !quantity) {
                console.error('Saknar nödvändig information:', orderData);
                continue;
            }

            // Hämta maträttens detaljer från HerringDB
            const dishDetails = await getDishDetails(dishId);

            if (!dishDetails) {
                console.error(`Maträtt med ID ${dishId} kunde inte hittas`);
                continue;
            }

            // Skapa en ny beställning
            const order = {
                orderId: uuid(),
                dishId,
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

            // Spara beställningen i HerringBooking-tabellen
            await db.put({
                TableName: 'HerringBooking',
                Item: order,
            }).promise();

            // Lägg till i bekräftelselistan
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
