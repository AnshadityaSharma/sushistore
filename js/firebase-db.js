import { getDatabase, ref, push, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Initialize database instance
let database;

export const initDatabase = (app) => {
  database = getDatabase(app);
};

/**
 * Saves order data to Firebase
 * @param {object} orderData - Order details 
 * @returns {Promise<boolean>} - True if successful
 */
export const saveOrder = async (orderData) => {
  try {
    const ordersRef = ref(database, 'orders');
    await push(ordersRef, {
      ...orderData,
      timestamp: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Firebase save error:", error);
    return false;
  }
};

/**
 * Fetches all orders from Firebase
 * @param {function} callback - Receives orders data
 */
export const getOrders = (callback) => {
  const ordersRef = ref(database, 'orders');
  onValue(ordersRef, (snapshot) => {
    callback(snapshot.val() || {});
  });
};