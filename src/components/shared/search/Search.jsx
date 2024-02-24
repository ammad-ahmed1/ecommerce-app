import React from "react";
import styles from "./Search.module.scss";

const Search = ({ value, onChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={onChange}
        value={value}
        className={styles.searchInput}
      />
    </div>
  );
};

export default Search;
