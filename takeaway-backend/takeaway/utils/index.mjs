import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcryptjs';
const saltRounds = 10;

export const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export const comparePasswords = async (password, storedPassword) => {
    const isEqual = await bcrypt.compare(password, storedPassword);
    return isEqual;
}

export const generateJWT = (user) => {
    const payload = {
        username: user.username,
        role: user.role, 
        isAdmin: user.role === 'admin'
    };

    const token = jwt.sign(payload, process.env.SECRET_ACCESS_KEY, { expiresIn: '1h' });

    return token;
};