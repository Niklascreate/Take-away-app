import axios from 'axios';
import { Dish } from '../interface/Interface';
import { Drinks } from '../interface/Interface';

export const fetchMenu = async (): Promise<Dish[]> => {
  const response = await axios.get<Dish[]>(
    "https://9vd0qeeuoa.execute-api.eu-north-1.amazonaws.com/get/menu?key=key-Y9Z0A"
  );
  return response.data;
};

export const fetchDrinks = async (): Promise<Drinks[]> => {
  const response = await axios.get<Drinks[]>(
    "https://9vd0qeeuoa.execute-api.eu-north-1.amazonaws.com/get/drink/menu?key=key-Y9Z0A"
  );
  return response.data;
};
