const { db } = require('../../services/index');
const { sendResponse, sendError } = require('../../responses/index');
const { v4: uuid } = require('uuid');

async function getDishDetails(dishId) {
    try {
        const result = await db.get({
            TableName: 'HerringDB',
            Key: { id: dishId }
        });
        return result.Item;
    } catch (error) {
        console.error(`Fel vid hämtning av maträtt ${dishId}:`, error);
        return null;
    }
}

function validatePhoneNumber(phoneNumber) {
    const phoneNmbr = /^\d{10}$/;
    return phoneNmbr.test(phoneNumber);
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
        let totalPrice = 0;

        for (const orderData of orders) {
            const { dishId, customerName, email, phoneNumber, quantity, specialRequests } = orderData;

            if (!dishId || !customerName || !email || !phoneNumber || !quantity) {
                console.error('Saknar nödvändig information:', orderData);
                continue;
            }


            if (!validatePhoneNumber(phoneNumber)) {
                return sendError(400, 'Ogiltigt mobilnummer. Vänligen ange exakt 10 siffror.');
            }

            const dishDetails = await getDishDetails(dishId);

            if (!dishDetails) {
                console.error(`Maträtt med ID ${dishId} kunde inte hittas`);
                continue;
            }

            const orderPrice = dishDetails.price * quantity;
            totalPrice += orderPrice;

            const order = {
                orderId: uuid().substring(0, 4),
                dishId,
                dishName: dishDetails.dish,
                category: dishDetails.category,
                description: dishDetails.description,
                price: dishDetails.price,
                customerName,
                email,
                phoneNumber,
                quantity,
                specialRequests: specialRequests || '',
                orderPrice,
                createdAt: new Date().toISOString(),
            };

            await db.put({
                TableName: 'HerringOrder',
                Item: order,
            });

            confirmations.push({
                orderId: order.orderId,
                dishName: order.dishName,
                category: order.category,
                description: order.description,
                price: order.price,
                customerName: order.customerName,
                email: order.email,
                phoneNumber: order.phoneNumber,
                quantity: order.quantity,
                specialRequests: order.specialRequests,
                orderPrice: order.orderPrice,
                createdAt: order.createdAt,
            });
        }

        if (confirmations.length === 0) {
            return sendError(400, 'Inga giltiga beställningar kunde behandlas');
        }

        return sendResponse(201, {
            message: 'Beställningar mottagna!',
            totalPrice,
            data: confirmations,
        });

    } catch (error) {
        console.error('Fel vid hantering av beställningar:', error);
        return sendError(500, { message: 'Kunde inte bearbeta beställningarna', error: error.message });
    }
};

//Niklas
//Sammanfattningsvis tar denna Lambda-funktion emot en lista med beställningar.
//Validerar mobilnumret, hämtar maträttsinformation från en databas, beräknar totalpriset och sparar beställningarna i en annan databas, innan den returnerar en bekräftelse.