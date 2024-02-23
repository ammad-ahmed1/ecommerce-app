import React from "react";
import styles from "./Hero.module.scss";
const Hero = () => {
  return (
    <section>
      {" "}
      <div className={styles.container}>
        <img
          src="../../../public/hero/hero-img.jpg"
          className={styles.heroImg}
        />
        <div className={styles.leftTop}>
          <span className={styles.heroHeading}>The Best</span>
        </div>
        <div className={styles.leftBtm}>
          <span className={styles.heroHeading}>Online Shop</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
