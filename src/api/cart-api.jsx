import axios from "axios";

// Add products to cart
export const userCart = (token, cart) => {
  return axios.post(
    "http://localhost:8000/api/user/cart", 
    { cart },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Get user cart
export const getUserCart = (token) => {
  return axios.get("http://localhost:8000/api/user/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Empty cart
export const emptyCart = (token) => {
  return axios.delete("http://localhost:8000/api/user/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Save address
export const saveAddress = (token, address) => {
  return axios.post(
    "http://localhost:8000/api/user/address",
    { address },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Save order
export const saveOrder = (token) => {
  return axios.post(
    "http://localhost:8000/api/user/order",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Get user orders
export const getOrder = (token) => {
  return axios.get("http://localhost:8000/api/user/order", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};