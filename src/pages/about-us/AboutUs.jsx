// AboutUs.js

import React from "react";
import styles from "./AboutUs.module.scss";

const AboutUs = () => {
  return (
    <div className={styles.aboutUs}>
      <div className={styles.container}>
        <h1>About Shop From Home</h1>
        <p>
          Shop From Home is your ultimate destination for online shopping. We
          aim to provide our customers with a seamless and enjoyable shopping
          experience from the comfort of their own homes.
        </p>
        <h2>Our Mission</h2>
        <p>
          Our mission is to make online shopping easy, convenient, and
          affordable for everyone. We strive to offer a wide range of
          high-quality products at competitive prices, along with exceptional
          customer service.
        </p>
        <h2>Why Choose Us?</h2>
        <ul>
          <li>
            Wide Selection: We offer a diverse range of products from various
            categories to cater to all your needs.
          </li>
          <li>
            Quality Assurance: We ensure that all products listed on our
            platform meet the highest quality standards.
          </li>
          <li>
            Convenience: With just a few clicks, you can browse, select, and
            purchase your desired items without leaving your home.
          </li>
          <li>
            Secure Transactions: We prioritize the security of your transactions
            and personal information, providing a safe shopping environment.
          </li>
          <li>
            Exceptional Customer Service: Our dedicated support team is always
            ready to assist you with any queries or concerns.
          </li>
        </ul>
        <h2>Contact Us</h2>
        <p>
          If you have any questions or feedback, feel free to reach out to us:
        </p>
        <p>Email: contact@shopfromhome.com</p>
        <p>Phone: 123-456-7890</p>
        <p>Address: 123 Main St, City, Country</p>
      </div>
    </div>
  );
};

export default AboutUs;
