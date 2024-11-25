export interface Dish {
    imageUrl: string; 
    available: boolean; 
    createdAt: string; 
    description: string; 
    ingredients: string[]; 
    id: string; 
    name: string; 
    price: number;
  }

export interface Drinks {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
}  

