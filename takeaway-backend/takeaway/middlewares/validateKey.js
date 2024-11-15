const { keys } = require('../../data/keys');

exports.handler = () => ({
  before: (handler) => {
    const { key } = handler.event.queryStringParameters;

    if (!key) {
      throw new Error('Du måste skicka med en API nyckel');
    }

    if (!keys.some(k => k === key)) {
      throw new Error('Din API nyckel finns inte!');
    }
  }
});