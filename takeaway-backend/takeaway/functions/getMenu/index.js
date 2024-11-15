const { db } = require('../../services/index');
const { sendResponse, sendError } = require('../../responses/index');
const middy = require('@middy/core');
const { validateKey } = require('../../middlewares/validateKey');
const { errorHandler } = require('../../middlewares/errorHandler');
const { keys } = require('../../data/keys')

exports.handler = middy(async () => {
    try {
        
        const result = await db.scan({
            TableName: 'HerringDB'
        });

        
        return sendResponse(200, result.Items);

    } catch (error) {
        return sendError(500, { message: error.message });
    }
}).use(validateKey(keys))
  .use(errorHandler());

//Niklas
//Denna funktion hämtar menyn från databasen.