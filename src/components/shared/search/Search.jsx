import React from "react";
import styles from "./Search.module.scss";

const Search = ({ handleSearch }) => {
  const handleChange = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        className={styles.searchInput}
      />
    </div>
  );
};

export default Search;
