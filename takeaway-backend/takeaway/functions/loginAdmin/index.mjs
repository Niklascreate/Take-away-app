import { adminUser } from '../../data/admin.mjs';
import { sendResponse } from '../../responses/index.mjs';
import jwt from 'jsonwebtoken';

export const handler = async (req) => {
  const { username, password } = req.body;

  if (username === adminUser.username && password === adminUser.password) {
    const token = jwt.sign(
      { username: adminUser.username, role: adminUser.role }, 
      process.env.SECRET_ACCESS_KEY,
      { expiresIn: '1h' }
    );

    return sendResponse(200, { message: 'Inloggning lyckades som admin', token });
  }

  return sendResponse(401, { message: 'Unauthorized: Invalid credentials' });
};