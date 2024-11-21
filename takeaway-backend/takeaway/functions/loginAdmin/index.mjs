import { sendResponseWithHeaders } from '../../responses/index.mjs';
import { validateAdmin } from '../../middlewares/validateAdmin.mjs';
import { generateJWT } from '../../utils/index.mjs';
import { validateToken } from '../../middlewares/validateToken.mjs';
import 'dotenv/config';
import middy from '@middy/core';

export const handler = middy(async (event) => {
  const token = generateJWT(JSON.parse(event.body));
  console.log('Generated token:', token);

  return sendResponseWithHeaders(201, { 
    message: 'Login successful' 
  }, token);
}).use(validateToken())
.use(validateAdmin());