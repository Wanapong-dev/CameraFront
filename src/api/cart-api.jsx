import axios from "axios";


export const userCart = (token, cart) => {
  return axios.post(
    "http://localhost:8000/api/user/cart", 
     cart ,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const listUserCart = (token) => {
  return axios.get("http://localhost:8000/api/user/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const saveAddress = (token, address) => {
  return axios.post(
    "http://localhost:8000/api/user/address",
    {address} ,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const saveOrder = (token, payload) => {
  return axios.post(
    "http://localhost:8000/api/user/order",
    payload ,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
