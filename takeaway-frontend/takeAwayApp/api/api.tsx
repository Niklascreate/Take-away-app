import axios from 'axios';
import { Dish, AdminPage, OrderItem } from '../interface/Interface';

/* Används i menu komponenten */
export const fetchMenu = async (): Promise<Dish[]> => {
  const response = await axios.get<Dish[]>(
    "https://y2zbpyprg7.execute-api.eu-north-1.amazonaws.com/get/menu?key=key-Y9Z0A"
  );
  return response.data;
};

/* Används i OverlayConfirmation */
export const fetchOrder = async (): Promise<OrderItem[]> => {
  const response = await axios.get<OrderItem[]>(
    "https://y2zbpyprg7.execute-api.eu-north-1.amazonaws.com/order?key=key-Y9Z0A"
  );
  return response.data;
};

/* Används i OverlayOrder komponenten */
export const orderFood = async (orders: {
  customerName: string;
  email: string;
  phoneNumber: string;
  order: {
    id: string;
    quantity: number;
    specialRequests?: string;
    }[];
}) => {
  try {
    const response = await axios.post(
      "https://y2zbpyprg7.execute-api.eu-north-1.amazonaws.com/order/food",
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


/* Används i AdminConfirmation*/
export const adminOrders = async () => {
  try {
    const response = await axios.get<AdminPage[]>(
      "https://y2zbpyprg7.execute-api.eu-north-1.amazonaws.com/order",
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

/* Används i AdminConfirmation*/
export const addCommentToOrder = async (orderId: string, comment: string) => {
  try {
    const response = await axios.post(
      "https://y2zbpyprg7.execute-api.eu-north-1.amazonaws.com/admin/kommentar",
      { orderId, comment },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Fel vid skickande av kommentar:", error);
    throw error;
  }
};

/* Används i ChangeOrderBtn*/
export const adminDeleteOrder = async (orderId: string, itemId: string): Promise<void> => {
  try {
    const response = await axios.delete(
      `https://y2zbpyprg7.execute-api.eu-north-1.amazonaws.com/admin/delete/order/${orderId}/${itemId}`, 
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

/* Används i ChangeOrderbtn */
export const updateOrderQuantity = async (data: { id: string; quantity: number }, orderId: string): Promise<void> => {
  if (!orderId) {
    throw new Error("OrderId är obligatoriskt för att uppdatera en order.");
  }

  if (!data || !data.id || data.quantity === undefined) {
    throw new Error("Felaktig data för att uppdatera order.");
  }

  try {
    const response = await axios.put(
      `https://y2zbpyprg7.execute-api.eu-north-1.amazonaws.com/menu/update/${orderId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Order uppdaterad framgångsrikt:", response.data);
  } catch (error) {
    console.error("Fel vid uppdatering av order:", error);
    throw error;
  }
};

/* Används i adminpage för att uppdatera en order */
  export const adminQuantity = async (
    orderId: string,
    itemId: string,
    newQuantity: number
  ): Promise<void> => {
    if (!orderId) {
      throw new Error("OrderId är obligatoriskt för att uppdatera en order.");
    }

    if (!itemId) {
      throw new Error("ItemId är obligatoriskt för att uppdatera en order.");
    }

    if (newQuantity === undefined || newQuantity < 1) {
      throw new Error("Kvantiteten måste vara minst 1.");
    }

    const data = {
      id: itemId,
      quantity: newQuantity,
    };

    try {
      const response = await axios.put(
        `https://y2zbpyprg7.execute-api.eu-north-1.amazonaws.com/menu/update/${orderId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Order uppdaterad framgångsrikt:", response.data);
    } catch (error) {
      console.error("Fel vid uppdatering av order:", error);
      throw error;
    }
  };


/* Används i OverLayInlog */
export const loginUser = async (username: string, password: string): Promise<void> => {
  const loginData = { username, password };

  try {
    const response = await axios.post(
      "https://y2zbpyprg7.execute-api.eu-north-1.amazonaws.com/admin/login",
      loginData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response || response.status !== 200) {
      throw new Error("Fel vid inloggning");
    }

    sessionStorage.setItem("username", username);
  } catch (error: any) {
    console.error("Något gick fel vid inloggning:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Misslyckades med inloggning");
  }
};

/* Används i adminconfirmationpage för att låsa en order i databasen */

export const lockOrder = async (orderId: string, id: string): Promise<void> => {
  try {
    const response = await axios.post(
      `https://y2zbpyprg7.execute-api.eu-north-1.amazonaws.com/admin/order/lock`,
      { orderId, id }, // Body innehåller både orderId och id
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Order låst:", response.data);
  } catch (error: any) {
    console.error("Kunde inte låsa order:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Misslyckades med att låsa order.");
  }
};