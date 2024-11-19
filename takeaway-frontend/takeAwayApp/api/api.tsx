import axios from 'axios';
import { Dish } from '../interface/interface';

export const fetchMenu = async (): Promise<Dish[]> => {
  const response = await axios.get<Dish[]>(
    "https://spclae7z7g.execute-api.eu-north-1.amazonaws.com/get/menu?key=key-1A2B3"
  );
  return response.data;
};
