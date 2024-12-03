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

/* Används i overlayMenyInfo*/
export interface UpdateOrder {
  orderId: string;  
  id: string;      
  quantity: number;
}

export interface OverlayMenyInfoProps {
  closeOverlay: () => void; 
  dish: Dish;             
}

/* Används i ChangeOrdetBtn */
export interface ChangeOrderBtnProps {
  order: UpdateOrder;
  onRemove: (orderId: string) => void;
}

/* Används i OverlayOrder */
export interface OverlayOrderProps {
  cart: any[];
  onClose: () => void;
}

/* Används i OverlayInlog */
export interface LoginOverlayProps {
  onClose: () => void;
}

/* Används i overlayConfirmation */
export interface OrderItem {
  id: string;
  orderId: string;
  customerName: string;
  email: string;
  phoneNumber: string;
  quantity: number;
  specialRequests?: string; 
  dishName: string;
  price: number;
  createdAt: string;
}

/* Används i adminconfirmationpage */
export interface AdminPage {
  orderId: string;
  id: string;
  dishName?: string;
  customerName: string;
  email: string; 
  phoneNumber: string;
  quantity?: number; 
  specialRequests?: string;
  totalPrice?: number; 
  createdAt: string;
  comment?: string;
  status?: string;
}