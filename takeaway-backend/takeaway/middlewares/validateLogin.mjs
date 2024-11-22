import { comparePasswords } from '../utils/index.mjs';
import { adminUser } from '../data/admin.mjs';
import { generateJWT } from '../utils/index.mjs';

export const validateLogin = () => ({
    before: async (handler) => {
        let body = handler.event.body;
        
        if (typeof body === 'string') {
            body = JSON.parse(body);
        }

        const { username, password } = body;

        if (username !== adminUser.username) {
            console.log('Användarnamn finns inte');
            throw new Error('Användarnamn finns inte');
        }

        const isEqual = await comparePasswords(password, adminUser.password);

        if (!isEqual) {
            console.log('Användarnamn och lösenord matchar inte');
            throw new Error('Användarnamn och lösenord matchar inte');
        }

        if (adminUser.role !== 'admin') {
            console.log('Inte en admin');
            throw new Error('Behörighet nekad: Inte en admin');
        }

        const token = generateJWT(adminUser);

        console.log('Inloggning lyckades, användaren är en admin!');
        
        handler.response = {
            statusCode: 200,
            body: JSON.stringify({ message: 'Inloggning lyckades', token: token })
        };
    }
});
