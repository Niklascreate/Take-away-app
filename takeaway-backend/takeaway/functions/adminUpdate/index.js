const { db } = require('../../services/index');
const { sendResponse, sendError } = require('../../responses/index');

exports.handler = async (event) => {
    try {
        if (!event.body) {
            return sendError(400, { message: 'Ingen data skickades' });
        }

        const { dish, category, price, description, ingredients, available } = JSON.parse(event.body);

        const itemId = event.pathParameters.id;
        if (!itemId) {
            return sendError(400, { message: 'Ingen maträtt ID angiven' });
        }

        if (!dish && !category && !price && !description && !ingredients && typeof available !== 'boolean') {
            return sendError(400, { message: 'Inget fält att uppdatera. Vänligen specificera minst ett attribut.' });
        }

        const updateFields = [];
        const expressionAttributeValues = {};

        if (dish) {
            updateFields.push('dish = :dish');
            expressionAttributeValues[':dish'] = dish;
        }
        if (category) {
            updateFields.push('category = :category');
            expressionAttributeValues[':category'] = category;
        }
        if (price) {
            updateFields.push('price = :price');
            expressionAttributeValues[':price'] = price;
        }
        if (description) {
            updateFields.push('description = :description');
            expressionAttributeValues[':description'] = description;
        }
        if (ingredients) {
            updateFields.push('ingredients = :ingredients');
            expressionAttributeValues[':ingredients'] = ingredients;
        }
        if (typeof available === 'boolean') {
            updateFields.push('available = :available');
            expressionAttributeValues[':available'] = available;
        }

        const updateExpression = `set ${updateFields.join(', ')}`;

        await db.update({
            TableName: 'HerringDB',
            Key: { id: itemId },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ConditionExpression: 'attribute_exists(id)' 
        });

        return sendResponse(200, { message: 'Maträtt uppdaterad!', id: itemId });

    } catch (error) {
        if (error.code === 'ConditionalCheckFailedException') {
            return sendError(404, { message: 'Maträtt med angivet ID hittades inte.' });
        }
        console.error('Fel vid uppdatering av maträtt:', error);
        return sendError(500, { message: 'Kunde inte uppdatera maträtten', error: error.message });
    }
};

// Författare: Jonas, funktion gör så att admin kan göra ändringar i menyn