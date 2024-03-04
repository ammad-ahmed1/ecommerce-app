import React from "react";
import styles from "./PaginationStyle.module.scss";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <h1>Pagination</h1>
      <ul>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={number === currentPage ? styles.active : ""}
            onClick={() => onPageChange(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
