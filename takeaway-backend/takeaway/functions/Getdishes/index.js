const { db } = require('../../services/index');
const { sendResponse, sendError } = require('../../responses/index');

exports.handler = async () => {
    try {
        
        const result = await db.scan({
            TableName: 'HerringDB'
        });

        
        return sendResponse(200, result.Items);

    } catch (error) {
        return sendError(500, { message: error.message });
    }
}

//Niklas
//Denna funktion hämtar menyn från databasen.