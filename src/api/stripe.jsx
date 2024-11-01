import axios from 'axios'

export const payment = (token) => {
    return axios.post("http://localhost:8000/api/create-payment-intent",{}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };