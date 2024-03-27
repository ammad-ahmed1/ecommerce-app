import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "./Checkout.module.scss";
import TotalBillCard from "../../../components/shared/cards/total-bill-card/TotalBillCard";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartTotalAmount,
  selectCartTotalQuantity,
  selectCartItems,
  TOTAL_BILL,
} from "../../../redux/slice/cartSlice";
import CheckoutForm from "../checkout-form/CheckoutForm";

import.meta.env.VITE_STRIPE_PK;
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Checkout = () => {
  // ---------hooks-------------
  const dispatch = useDispatch();
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartItems = useSelector(selectCartItems);
  // ---------states & stripe------------
  const [message, setMessage] = useState("Initializing Checkout!");
  const [orderSummary, setOrderSummary] = useState(null);
  const [clientSecret, setClientSecret] = useState(""); //stripe state
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        userEmail: orderSummary?.email,
        address: orderSummary?.address,
      }),
    })
      .then((res) => {
        if (res.ok) {
          res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        setMessage("Failed to initialize checkout!");
        toast.error("Something went wrong");
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  // ----------useEffects--------
  // -------getting order address from local storage--------
  useEffect(() => {
    const storedOrderDetail = localStorage.getItem("orderDetail");
    if (storedOrderDetail) {
      setOrderSummary(JSON.parse(storedOrderDetail));
    }
  }, []);
  // ------calling total bill from redux---------
  useEffect(() => {
    dispatch(TOTAL_BILL());
  }, []);
  return (
    <div className={styles.checkoutMainDiv}>
      <div className={styles["order-summary"]}>
        <h2>Order Summary</h2>
        <div>
          <strong>Name:</strong> {orderSummary?.firstName}{" "}
          {orderSummary?.lastName}
        </div>
        <div>
          <strong>Email:</strong> {orderSummary?.email}
        </div>
        <div>
          <strong>Address:</strong> {orderSummary?.address},{" "}
          {orderSummary?.city}, {orderSummary?.country}, {orderSummary?.zip}
        </div>
        <div>
          <strong>Number of items:</strong> {cartItems?.length}
        </div>
        <div>
          <strong>Total Bill:</strong> {cartTotalAmount}
        </div>
      </div>
      <Elements options={{}} stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};
export default Checkout;
