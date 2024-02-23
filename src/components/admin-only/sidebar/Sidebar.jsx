import React from "react";
import styles from "./Sidebar.module.scss";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebarUL}>
        <li className={styles.sidebarLI}>
          <Link to="/admin/dashboard" className={styles.sidebarA}>
            Dashboard
          </Link>
        </li>
        <li className={styles.sidebarLI}>
          <Link to="/admin/view-products" className={styles.sidebarA}>
            View Products
          </Link>
        </li>
        <li className={styles.sidebarLI}>
          <Link to="/admin/add-product" className={styles.sidebarA}>
            Add Product
          </Link>
        </li>
        <li className={styles.sidebarLI}>
          <Link to="/admin/orders" className={styles.sidebarA}>
            View Orders
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
