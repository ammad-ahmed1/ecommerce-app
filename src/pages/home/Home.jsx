import React, { useEffect } from "react";
import styles from "./Home.module.scss";
import Hero from "../../components/hero/Hero";

const Home = () => {
  // ---------hooks----------
  // --------effect----------

  return (
    <>
      <div>
        <Hero />
      </div>
      <div className={styles.grid_container}>
        <div className={styles.grid_item}>
          <img
            src="/public/homepage/fashion.jpg"
            alt="Image 1"
            className={styles.image}
          />
          <div className={styles.text}>Fashion Clothing</div>
        </div>
        <div className={styles.grid_item}>
          <img
            src="/public/homepage/electronics.jpeg"
            alt="Image 2"
            className={styles.image}
          />
          <div className={styles.text}>Electronic Appliances</div>
        </div>
        <div className={styles.grid_item}>
          <img
            src="/public/homepage/mobiles.jpg"
            alt="Image 1"
            className={styles.image}
          />
          <div className={styles.text}>Mobile Phones</div>
        </div>
        <div className={styles.grid_item}>
          <img
            src="/public/homepage/laptops.avif"
            alt="Image 2"
            className={styles.image}
          />
          <div className={styles.text}>Laptops</div>
        </div>
      </div>
    </>
  );
};

export default Home;
