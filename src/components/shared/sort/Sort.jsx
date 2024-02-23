import React from "react";
import styles from "./Sort.module.scss";

const Sort = ({ handleSort }) => {
  const handleChange = (e) => {
    handleSort(e.target.value);
  };

  return (
    <div>
      <select onChange={handleChange} className={styles.sortSelect}>
        <option value="">Sort By</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="time">Time</option>
      </select>
    </div>
  );
};

export default Sort;
