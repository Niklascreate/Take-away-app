export interface Dish {
  imageUrl: string; 
  available: boolean; 
  createdAt: string; 
  description: string; 
  ingredients: string[]; 
  id: string; 
  name: string; 
  price: number;
  category: string;
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

export interface OrderResponse {
message: string;
totalPrice: number;
data: OrderItem[];
}

export interface AdminPage {
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

export interface OrderProduct {
  id: string;
  dishName: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  specialRequests: string;
}

export interface OrderItem {
  orderId: string;
  customerName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  orderPrice: number;
  order: OrderProduct[];
}