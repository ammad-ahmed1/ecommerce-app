import React, { useEffect, useState } from "react";
import styles from "./CheckoutForm.module.scss";
import Loader from "../../../components/shared/loader/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { selectEmail } from "../../../redux/slice/authSlice";
import { db } from "../../../firebase/config";
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import {
  CLEAR_CART,
  TOTAL_BILL,
  selectCartTotalAmount,
} from "../../../redux/slice/cartSlice";
import { createOrder } from "../../../redux/slice/orderSlice";

const CheckoutForm = ({ clientSecret }) => {
  //--------------hooks---------------
  const stripe = useStripe();
  const elements = useElements();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const userEmail = useSelector(selectEmail);
  const bill = useSelector(selectCartTotalAmount);
  // ------------vars--------------
  const products = localStorage.getItem("cartItems");
  const shippingDetail = localStorage.getItem("orderDetail");
  //-------------states---------------
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //-------------effects--------------
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);
  //-------------functions------------
  const saveOrder = async () => {
    console.log("Save order!");
    // await createOrder();
    console.log(products, "....................bill");
    dispatch(
      createOrder({
        products,
        shippingDetail,
        userEmail,
        bill,
        createdAt: Timestamp.now().toDate(),
      })
    );
    // );
    dispatch(CLEAR_CART());
    nav("/order-confirmed");
  };
  // -----------effect------------
  useEffect(() => {
    dispatch(TOTAL_BILL());
  }, []);
  //-----------stripe func-----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const confirmPayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:5713/",
        },
        redirect: "if_required",
      })
      .then((result) => {
        // ok - paymentIntent // bad - error
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment successful");
            saveOrder();
          }
        }
      });

    setIsLoading(false);
  };

  return (
    <div>
      <section>
        <h2>Checkout</h2>
        <form className={styles.paymentForm} onSubmit={handleSubmit}>
          <div>
            {/* <CardElement className={styles.card}>
            <PaymentElement
              id="payment-element"
              options={paymentElementOptions}
            />
            <button disabled={isLoading || !stripe || !elements} id="submit">
              <span id="button-text">
                {isLoading ? (
                  <div className="spinner" id="spinner">
                    {" "}
                    <Loader />
                  </div>
                ) : (
                  "Pay now"
                )}
              </span>
            </button>
            {message && (
              <div id="payment-message" style={{ color: "red" }}>
                {message}
              </div>
            )}
          </CardElement> */}
            <PaymentElement />
            <button>Pay</button>
          </div>
        </form>
      </section>
      {/* ------to check order creation when stripe is not working------ */}
      {/* <button onClick={(e) => saveOrder()}>Pay</button> */}
    </div>
  );
};
export default CheckoutForm;
