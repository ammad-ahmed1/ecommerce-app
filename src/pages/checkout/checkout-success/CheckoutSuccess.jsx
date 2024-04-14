import React from "react";
import styles from "./CheckoutSuccess.module.scss";
import { Link } from "react-router-dom";
const CheckoutSuccess = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Checkout Successful!</h2>
      <p className={styles.message}>
        Thank you for your purchase. Your order has been successfully placed.
      </p>
      <Link to="/" className={styles.button}>
        Shop More
      </Link>
    </div>
  );
};

export default CheckoutSuccess;
