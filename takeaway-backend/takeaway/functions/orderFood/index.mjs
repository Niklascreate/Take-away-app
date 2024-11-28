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

function validatePhoneNumber(phoneNumber) {
    const phoneNmbr = /^\d{10}$/;
    return phoneNmbr.test(phoneNumber);
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validatePrice(price) {
    if (isNaN(price) || price <= 0) {
        return false;
    }
    return true;
}

export const handler = async (event) => {
    try {
        if (!event.body) {
            return sendError(400, 'Ingen data skickades');
        }

        const orderData = JSON.parse(event.body);

        if (!orderData.order || !Array.isArray(orderData.order) || orderData.order.length === 0) {
            return sendError(400, 'Förväntar en lista med maträtter i beställningen');
        }

        const confirmations = [];
        let totalPrice = 0;

        // Generera ett orderId för hela beställningen
        const orderId = generateOrderId();

        // Hantera varje maträtt i beställningen
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

            const orderItem = {
                id: orderId,
                dishName: dishDetails.name,
                category: dishDetails.category,
                description: dishDetails.description,
                price: dishDetails.price,
                quantity,
                specialRequests: specialRequests || ''
            };

            confirmations.push(orderItem);
        }

        if (confirmations.length === 0) {
            return sendError(400, 'Inga giltiga maträtter kunde behandlas');
        }

        // Skapa order-objektet och lägg till orderId
        const order = {
            orderId: orderId,  // Lägg till orderId här
            customerName: orderData.customerName,
            email: orderData.email,
            phoneNumber: orderData.phoneNumber,
            order: confirmations,
            orderPrice: totalPrice,
            createdAt: new Date().toISOString()
        };

        // Spara beställningen i databasen
        try {
            await db.put({
                TableName: 'HerringOrder',
                Item: order,
            });
        } catch (dbError) {
            console.error('Fel vid sparande av beställning:', dbError);
            return sendError(500, 'Kunde inte spara beställningen');
        }

        return sendResponse(201, {
            message: 'Beställningen mottagen!',
            totalPrice,
            data: order,
        });

    } catch (error) {
        console.error('Fel vid hantering av beställningen:', error);
        return sendError(500, { message: 'Kunde inte bearbeta beställningen', error: error.message });
    }
};


//Niklas
//Sammanfattningsvis tar denna Lambda-funktion emot en lista med beställningar.
//Validerar mobilnumret, hämtar maträttsinformation från en databas, beräknar totalpriset och sparar beställningarna i en annan databas, innan den returnerar en bekräftelse.