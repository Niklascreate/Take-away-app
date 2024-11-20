import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateJWT = (user) => {
    const payload = {
        user: user.username, 
        isAdmin: true
    };

    const token = jwt.sign(payload, process.env.SECRET_ACCESS_KEY, { expiresIn: '24h' });

    return token;
};