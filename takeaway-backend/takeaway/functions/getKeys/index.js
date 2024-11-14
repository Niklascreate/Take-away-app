const keys = require('./data/keys');

exports.handler = async (event) => {
    try {
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        return {
            statusCode: 200,
            body: JSON.stringify({ key: randomKey })
        };

    } catch (error) {
        console.error('Fel vid hämtning av nyckel:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Kunde inte hämta nyckel' })
        };
    }
};
