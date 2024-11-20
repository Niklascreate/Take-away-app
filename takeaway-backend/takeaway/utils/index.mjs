import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { sendResponse } from '../responses/index.mjs';

export const generateJWT = (user) => {
    const payload = {
        user : user.username, 
        isAdmin : true
    };

    const token = jwt.sign(payload, process.env.SECRET_ACCESS_KEY, { expiresIn : '1h' });

    return token;
};

export const verifyJWT = (token) => {

};