const keys = require('../../data/keys');
const { sendResponse } = require('../../responses/index');

exports.handler = async (event) => {
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    
    return sendResponse(200, randomKey);
};
