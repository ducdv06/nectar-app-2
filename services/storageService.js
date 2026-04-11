// services/storageService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@nectar_user';
const TOKEN_KEY = '@nectar_token';
const USERS_KEY = '@nectar_users';  // Thêm key lưu danh sách users
const CART_KEY = '@nectar_cart';
const ORDERS_KEY = '@nectar_orders';

// ==================== USER / AUTH ====================
export const saveUser = async (userData) => {
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem(USER_KEY, jsonValue);
    console.log('User saved successfully');
    return true;
  } catch (e) {
    console.log('Save user error:', e);
    return false;
  }
};

export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('Get user error:', e);
    return null;
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
    await AsyncStorage.removeItem(TOKEN_KEY);
    console.log('User and token removed successfully');
    return true;
  } catch (e) {
    console.log('Remove user error:', e);
    return false;
  }
};

// ==================== TOKEN ====================
export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    console.log('Token saved successfully');
    return true;
  } catch (e) {
    console.log('Save token error:', e);
    return false;
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (e) {
    console.log('Get token error:', e);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    return true;
  } catch (e) {
    console.log('Remove token error:', e);
    return false;
  }
};

// ==================== USER LIST ====================
export const getAllUsers = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USERS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log('Get all users error:', e);
    return [];
  }
};

export const saveUserToUsersList = async (userData) => {
  try {
    const users = await getAllUsers();
    // Kiểm tra email đã tồn tại chưa
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      return { success: false, message: "Email already exists" };
    }
    users.push(userData);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { success: true, message: "User created successfully" };
  } catch (e) {
    console.log('Save user to list error:', e);
    return { success: false, message: "Error creating user" };
  }
};

export const checkUserExists = async (email, password) => {
  try {
    const users = await getAllUsers();
    const user = users.find(user => user.email === email && user.password === password);
    return user || null;
  } catch (e) {
    console.log('Check user exists error:', e);
    return null;
  }
};

// ==================== CART ====================
export const saveCart = async (cart) => {
  try {
    const jsonValue = JSON.stringify(cart);
    await AsyncStorage.setItem(CART_KEY, jsonValue);
    console.log('Cart saved successfully');
    return true;
  } catch (e) {
    console.log('Save cart error:', e);
    return false;
  }
};

export const getCart = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(CART_KEY);
    const cart = jsonValue != null ? JSON.parse(jsonValue) : [];
    console.log('Cart loaded:', cart.length, 'items');
    return cart;
  } catch (e) {
    console.log('Get cart error:', e);
    return [];
  }
};

export const clearCart = async () => {
  try {
    await AsyncStorage.removeItem(CART_KEY);
    console.log('Cart cleared');
    return true;
  } catch (e) {
    console.log('Clear cart error:', e);
    return false;
  }
};

export const addToCart = async (product, quantity = 1) => {
  try {
    const currentCart = await getCart();
    const existingIndex = currentCart.findIndex(item => item.id === product.id);
    
    if (existingIndex >= 0) {
      currentCart[existingIndex].qty = (currentCart[existingIndex].qty || 1) + quantity;
      console.log('Updated existing item:', product.name);
    } else {
      const newItem = { ...product, qty: quantity };
      currentCart.push(newItem);
      console.log('Added new item:', product.name);
    }
    
    await saveCart(currentCart);
    return currentCart;
  } catch (e) {
    console.log('Add to cart error:', e);
    return null;
  }
};

// ==================== ORDERS ====================
export const saveOrder = async (order) => {
  try {
    const currentOrders = await getOrders();
    const newOrder = {
      ...order,
      id: Date.now(),
      orderId: `ORD${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    currentOrders.unshift(newOrder);
    await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(currentOrders));
    console.log('Order saved:', newOrder.orderId);
    return true;
  } catch (e) {
    console.log('Save order error:', e);
    return false;
  }
};

export const getOrders = async () => {
  try {
    const data = await AsyncStorage.getItem(ORDERS_KEY);
    const orders = data ? JSON.parse(data) : [];
    console.log('Orders loaded:', orders.length);
    return orders;
  } catch (e) {
    console.log('Get orders error:', e);
    return [];
  }
};