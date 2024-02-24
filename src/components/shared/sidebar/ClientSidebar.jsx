import React, { useState } from "react";
import styles from "./ClientSidebar.module.scss"; // Import your style module

const ClientSidebar = ({ categories, onCategoryChange, onPriceChange }) => {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [activeTab, setActiveTab] = useState("categories");

  const handleCategoryChange = (category) => {
    onCategoryChange(category);
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setPriceRange({ ...priceRange, [name]: parseInt(value) });
    onPriceChange(priceRange);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.sidebar}>
      <h2>Filters</h2>
      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${
            activeTab === "categories" ? styles.active : ""
          }`}
          onClick={() => handleTabChange("categories")}
        >
          Categories
        </div>
        <div
          className={`${styles.tab} ${
            activeTab === "price" ? styles.active : ""
          }`}
          onClick={() => handleTabChange("price")}
        >
          Price Range
        </div>
      </div>
      {activeTab === "categories" && (
        <div className={styles.tabContent}>
          <h3>Categories</h3>
          <ul>
            <li>
              <input
                type="checkbox"
                id="laptop"
                name="laptop"
                onChange={() => handleCategoryChange("laptop")}
              />
              <label htmlFor="laptop">Laptop</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="electronics"
                name="electronics"
                onChange={() => handleCategoryChange("electronics")}
              />
              <label htmlFor="electronics">Electronics</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="fashion"
                name="fashion"
                onChange={() => handleCategoryChange("fashion")}
              />
              <label htmlFor="fashion">Fashion</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="phone"
                name="phone"
                onChange={() => handleCategoryChange("phone")}
              />
              <label htmlFor="phone">Phone</label>
            </li>
          </ul>
        </div>
      )}
      {activeTab === "price" && (
        <div className={styles.tabContent}>
          <h3>Price Range</h3>
          <input
            type="range"
            name="min"
            min={0}
            max={1000}
            value={priceRange.min}
            onChange={handlePriceChange}
          />
          <input
            type="range"
            name="max"
            min={0}
            max={1000}
            value={priceRange.max}
            onChange={handlePriceChange}
          />
          <p>
            Min: ${priceRange.min} - Max: ${priceRange.max}
          </p>
        </div>
      )}
    </div>
  );
};

export default ClientSidebar;
