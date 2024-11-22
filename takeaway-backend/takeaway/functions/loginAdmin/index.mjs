import { sendResponseWithHeaders } from '../../responses/index.mjs';
import { validateLogin } from '../../middlewares/validateLogin.mjs';
import { generateJWT } from '../../utils/index.mjs';
import 'dotenv/config';
import middy from '@middy/core';

export const handler = middy(async (event) => {
  const token = generateJWT(JSON.parse(event.body));
  console.log('Generated token:', token);

  return sendResponseWithHeaders(201, { 
    message: 'Login successful' 
  }, token);
})
.use(validateLogin());