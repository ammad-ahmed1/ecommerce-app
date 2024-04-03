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
  const appearance = {
    theme: "stripe",
  };

  // import.meta.env.STRIPE_PVT_KEY
  const options = {
    clientSecret,
    appearance,
  };
  useEffect(() => {
    setClientSecret(import.meta.VITE_PVT_KEY);
  }, []);
  useEffect(() => {
    // Create PaymentIntent after component mounts
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        // userEmail: orderSummary?.email,
        // address: orderSummary?.address,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setClientSecret(data.clientSecret); // Use the correct client secret from response
      })
      .catch((error) => {
        setMessage("Failed to initialize checkout!");
        toast.error("Something went wrong");
      });
  }, []);

  const CARD_ELEMENT_OPTIONS = {
    iconStyle: "solid",
    hidePostalCode: true,
    style: {
      base: {
        iconColor: "rgb(240, 57, 122)",
        color: "rgb(240, 57, 122)",
        fontSize: "16px",
        fontFamily: '"Open Sans", sans-serif',
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: "#CFD7DF",
        },
      },
      invalid: {
        color: "#e5424d",
        ":focus": {
          color: "#303238",
        },
      },
    },
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
      <section>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};
export default Checkout;
