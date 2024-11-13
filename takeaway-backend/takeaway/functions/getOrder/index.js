const { db } = require('../../services/index');
const { sendResponse, sendError } = require('../../responses/index');

exports.handler = async () => {
    try {
        const result = await db.scan({
            TableName: 'HerringOrder',
        });

        if (!result.Items || result.Items.length === 0) {
            return sendResponse(200, { message: 'Inga ordrar funna.' });
        }

        return sendResponse(200, result.Items);

    } catch (error) {
        return sendError(500, { message: `Fel vid hämtning av ordrar: ${error.message}` });
    }
};
