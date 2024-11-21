import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const validateToken = () => ({
    before: (handler) => {
        const token = handler.event.headers.authorization && handler.event.headers.authorization.split(' ')[1];
        console.log('validate', token);

        if (!token) {
            throw new Error('Token not provided!');
        }

        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_ACCESS_KEY);
            console.log('Decoded Token:', decodedToken);

            if (decodedToken.isadmin !== true) {
                throw new Error('Unauthorized: Not an admin');
            }

            return;

        } catch (error) {
            console.error('Token validation error:', error.message);
            throw new Error('Invalid or expired token!');
        }
    }
});
