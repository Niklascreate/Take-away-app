import axios from 'axios';
import { Dish } from '../interface/Interface';

export const fetchMenu = async (): Promise<Dish[]> => {
  const response = await axios.get<Dish[]>(
    "https://9vd0qeeuoa.execute-api.eu-north-1.amazonaws.com/get/menu?key=key-Y9Z0A"
  );
  return response.data;
};

export const orderFood = async (orders: any[]) => {
  try {
    const response = await axios.post(
      "https://7didnuouob.execute-api.eu-north-1.amazonaws.com/order/food",
      orders,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Fel vid beställning:', error);
    throw error;
  }
};