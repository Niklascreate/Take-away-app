import axios from 'axios';
import { Dish, Drinks, AdminPage, OrderItem } from '../interface/Interface';

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

export const orderFood = async (orders: any[]) => {
  try {
    const response = await axios.post(
      "https://9vd0qeeuoa.execute-api.eu-north-1.amazonaws.com/order/food",
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
  
export const fetchDrinks = async (): Promise<Drinks[]> => {
  const response = await axios.get<Drinks[]>(
    "https://9vd0qeeuoa.execute-api.eu-north-1.amazonaws.com/get/drink/menu?key=key-Y9Z0A"
  );
  return response.data;
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
      'https://9vd0qeeuoa.execute-api.eu-north-1.amazonaws.com/order/lock',
      { orderId, lockStatus: "locked" },
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

// // Funktion för att låsa upp en order
// export const adminOrderUnlock = async (orderId: string) => {
//   try {
//     const response = await axios.put(
//       'https://9vd0qeeuoa.execute-api.eu-north-1.amazonaws.com/order/lock',
//       { orderId, lockStatus: "unlocked" },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Gick inte att låsa upp order:', error);
//     throw error;
//   }
// };

// Funktion för att markera en order som klar
export const adminOrderDone = async (orderId: string) => {
  try {
    const response = await axios.put(
      'https://9vd0qeeuoa.execute-api.eu-north-1.amazonaws.com/order/klar',
      { orderId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Gick inte bekräfta order', error);
    throw error;
  }
};


// //Ta bort en order
// export const adminOrderDone = async (orderId: string) => {
//   try {
//     const response = await axios.put(
//       'https://9vd0qeeuoa.execute-api.eu-north-1.amazonaws.com/order/delete',
//       { orderId },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Gick inte bekräfta order', error);
//     throw error;
//   }
// };