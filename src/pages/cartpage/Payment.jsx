import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/stripe";
import useCameraStore from "../../store/camera-store";
import CheckoutForm from "../../component/cart/CheckoutForm";


const stripePromise = loadStripe("pk_test_51QCbwcRuMGUa9SDs5xEYDwaEyxFS5qPXS5fHRgLAqtNsmgKjH3AbltUd2zyXvATgoogci25J7hh7Tf9Sj5CARYnQ0054myuI4P");


export default function Payment() {
const token = useCameraStore((state)=>state.token)
const [clientSecret, setClientSecret] = useState("");


useEffect(()=>{
  payment(token)
  .then((res)=>{
    console.log(res)
    setClientSecret(res.data.clientSecret)
    console.log(clientSecret)
  })
  .catch((err)=>{
console.log(err)
  })
},[])


const appearance = {
  theme: 'stripe',
};
// Enable the skeleton loader UI for optimal loading.
const loader = 'auto';



  return (
    <div className="flex bg-white w-full h-[88vh] justify-center items-center py-12">

    <div className="flex  flex-col w-3/5 mx-auto my-auto shadow-lg rounded-lg p-4">
      {
        clientSecret && (
          <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
            <CheckoutForm/>
          </Elements>
        )
      }
    </div>
      </div>
  )
}

