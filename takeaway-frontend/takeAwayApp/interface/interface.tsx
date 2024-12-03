/* Används i overlayMenyInfo (props) & Menu (state och i render-loopen för att visa rätterna*/
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

/* Används i overlayMenyInfo (props)*/
export interface UpdateOrder {
  orderId: string;  
  id: string;      
  quantity: number;
}

export interface OverlayMenyInfoProps {
  closeOverlay: () => void; 
  dish: Dish;             
}

/* Används i overlayConfirmation */
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

/* Används i adminconfirmationpage */
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
  comment?: string;
  status?: string;
}
