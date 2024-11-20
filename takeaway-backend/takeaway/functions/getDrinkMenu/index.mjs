import { db } from '../../services/index.mjs';
import { sendResponse, sendError } from '../../responses/index.mjs';
import middy from '@middy/core';
import { validateKey } from '../../middlewares/validateKey.mjs';
import { errorHandler } from '../../middlewares/errorHandler.mjs';

export const handler = middy(async () => {
    try {
        const result = await db.scan({
            TableName: 'HerringDrinkDB'
        });

        return sendResponse(200, result.Items);

    } catch (error) {
        return sendError(500, { message: error.message });
    }
}).use(validateKey())
  .use(errorHandler());