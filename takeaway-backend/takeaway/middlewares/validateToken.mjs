import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const validateToken = () => ({
    before : (handler) => {
        const token = handler.event.headers.authorization && handler.event.headers.authorization.split(' ')[1];
        console.log('validate', token);

        const decodedToken = jwt.verify(token, process.env.SECRET_ACCESS_KEY);

        if(!decodedToken) {
            throw new Error('Invalid token!');
        }
        return;
    }
});