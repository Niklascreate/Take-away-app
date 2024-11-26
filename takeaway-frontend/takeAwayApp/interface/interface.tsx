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

  export interface OrderItem {
    id: string;
    customerName: string;
    email: string;
    phoneNumber: string;
    quantity: number;
    specialRequests?: string; 
    dishName: string;
    price: number;
  }

export interface OrderItem {
  dishId: string;
  customerName: string;
  email: string;
  phoneNumber: string;
  quantity: number;
  specialRequests?: string; 
}

export interface OrderResponse {
  message: string;
  totalPrice: number;
  data: OrderItem[];
}

export interface Drinks {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
}

export interface AdminPage {
  dishId: string;
  orderId: string;
  dishName: string;
  customerName: string;
  email: string;
  phoneNumber: string;
  quantity: number;
  specialRequests?: string;
  available: boolean; 
  createdAt: string; 
}