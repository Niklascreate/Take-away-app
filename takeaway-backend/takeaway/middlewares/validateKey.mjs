import { keys } from '../data/keys.mjs';

export const validateKey = () => ({
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
