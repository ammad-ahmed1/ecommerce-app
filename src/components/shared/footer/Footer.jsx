// Footer.js

import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h3>About Shop From Home</h3>
          <p>
            Your one-stop destination for all your shopping needs. We bring you
            the latest trends and best deals from around the world.
          </p>
        </div>
        <div className={styles.column}>
          <h3>Explore</h3>
          <ul>
            <li>Shop</li>
            <li>Categories</li>
            <li>Deals</li>
            <li>My Account</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h3>Contact Us</h3>
          <p>Email: contact@shopfromhome.com</p>
          <p>Phone: 123-456-7890</p>
          <p>Address: 123 Main St, City, Country</p>
        </div>
      </div>
      <div className={styles.copy}>
        <p>
          &copy; {new Date().getFullYear()} Shop From Home. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
