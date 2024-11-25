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

        const orders = JSON.parse(event.body);

        if (!Array.isArray(orders) || orders.length === 0) {
            return sendError(400, 'Förväntar en lista med beställningar');
        }

        const confirmations = [];
        let totalPrice = 0;

        for (const orderData of orders) {
            const { id, customerName, email, phoneNumber, quantity, specialRequests } = orderData;
        
            if (!id || !customerName || !email || !phoneNumber || !quantity) {
                console.error('Saknar nödvändig information:', orderData);
                continue;
            }

            if (!validatePhoneNumber(phoneNumber)) {
                return sendError(400, 'Ogiltigt mobilnummer. Vänligen ange exakt 10 siffror.');
            }

            if (!validateEmail(email)) {
                return sendError(400, 'Ogiltig e-postadress.');
            }
        
            if (!Number.isInteger(quantity) || quantity <= 0) {
                return sendError(400, 'Kvantiteten måste vara ett positivt heltal.');
            }
        
            const dishDetails = await getDishDetails(id);
        
            if (!dishDetails) {
                console.error(`Maträtt med ID ${id} kunde inte hittas`);
                continue;
            }

            if (!validatePrice(dishDetails.price)) {
                console.error(`Ogiltigt pris för maträtt med ID ${id}: ${dishDetails.price}`);
                return sendError(400, `Ogiltigt pris för maträtt med ID ${id}`);
            }
        
            const orderPrice = dishDetails.price * quantity;
            totalPrice += orderPrice;
        
            const order = {
                orderId: generateOrderId(),
                id,
                dishName: dishDetails.name,
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

            try {
                await db.put({
                    TableName: 'HerringOrder',
                    Item: order,
                });
            } catch (dbError) {
                console.error(`Fel vid sparande av beställning för maträtt med ID ${id}:`, dbError);
                return sendError(500, `Kunde inte spara beställning för maträtt med ID ${id}`);
            }
        
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