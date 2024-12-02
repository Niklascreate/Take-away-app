import axios from 'axios';
import { Dish, AdminPage, OrderItem, UpdateOrder } from '../interface/Interface';

export const fetchMenu = async (): Promise<Dish[]> => {
  const response = await axios.get<Dish[]>(
    "https://9vd0qeeuoa.execute-api.eu-north-1.amazonaws.com/get/menu?key=key-Y9Z0A"
  );
  return response.data;
};

export const fetchOrder = async (): Promise<OrderItem[]> => {
  const response = await axios.get<OrderItem[]>(
    "https://9vd0qeeuoa.execute-api.eu-north-1.amazonaws.com/order?key=key-Y9Z0A"
  );
  return response.data;
};

// export const orderFood = async (orders: OrderItem[]) => {
//   try {
//     const response = await axios.post(
//       "https://9vd0qeeuoa.execute-api.eu-north-1.amazonaws.com/order/food",
//       orders,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Fel vid beställning:', error);
//     throw error;
//   }
// };


// Test

export const orderFood = async (orders: {
  customerName: string;
  email: string;
  phoneNumber: string;
  order: {
    id: string;
    specialRequests?: string;
    quantity: number;
  }[];
}) => {
  try {
    const response = await axios.post(
      "https://9vd0qeeuoa.execute-api.eu-north-1.amazonaws.com/order/food",
      orders,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Fel vid beställning:', error);
    throw error;
  }
};
  
/* ADMIN PAGE API*/

export const adminOrders = async () => {
  try {
    const response = await axios.get<AdminPage[]>(
      "https://9vd0qeeuoa.execute-api.eu-north-1.amazonaws.com/order",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Gick inte att hämta ordrar:', error);
    throw error;
  }
};

// Funktion för att låsa en order
export const adminOrderLock = async (orderId: string) => {
  try {
    const response = await axios.post(
      'https://9vd0qeeuoa.execute-api.eu-north-1.amazonaws.com/admin/order/lock',
      { orderId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Gick inte att låsa order:', error);
    throw error;
  }
};

// Ta bort en order
export const adminDeleteOrder = async (orderId: string): Promise<void> => {
  try {
    const response = await axios.delete(
      `https://9vd0qeeuoa.execute-api.eu-north-1.amazonaws.com/admin/delete/order/${orderId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log('Order borttagen:', response.status);
  } catch (error: any) {
    console.error('Gick inte att ta bort order:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Misslyckades med att ta bort order');
  }
};

export const adminUpdateOrder = async (order: UpdateOrder): Promise<void> => {
  try {
    const response = await axios.put(
      `https://9vd0qeeuoa.execute-api.eu-north-1.amazonaws.com/menu/update/${order.orderId}`, 
      {
        orderId: order.orderId,
        quantity: order.quantity,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log('Order uppdaterad:', response.status);
  } catch (error: any) {
    console.error('Gick inte att uppdatera order:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Misslyckades med att uppdatera order');
  }
};

