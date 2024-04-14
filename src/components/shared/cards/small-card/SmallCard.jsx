// ProductCard.js
import React from "react";
import styles from "./SmallCard.module.scss"; // Import SCSS module for styling

const SmallCard = ({ heading, value }) => {
  return (
    <div className={styles["product-card"]}>
      <h2>{heading}</h2>
      <div className={styles["product-count"]}>{value}</div>
    </div>
  );
};

export default SmallCard;
