import React from "react";
import styles from "./Loader.module.scss";
const Loader = () => {
  return (
    <div
      style={{
        height: "70vh",
        width: "70vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src="../loader/loader-gif.gif" />
    </div>
  );
};

export default Loader;
