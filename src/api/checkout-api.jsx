import axios from "axios";

export const createPaymentIntent = async (token) => {
  return  await axios.post(
    "http://localhost:8000/api/create-payment-intent",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getConfigStripe = async (token) => {
  return await axios.get("http://localhost:8000/api/config", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};