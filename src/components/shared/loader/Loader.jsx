import React from "react";
import styles from "./Loader.module.scss";
const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        {/* Customize your loader here */}
        Loading...
      </div>
      )
    </div>
  );
};

export default Loader;
