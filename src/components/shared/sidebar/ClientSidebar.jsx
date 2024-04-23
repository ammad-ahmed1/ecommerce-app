import React, { useState } from "react";
import styles from "./ClientSidebar.module.scss"; // Import your style module
import { useSelector, useDispatch } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";
import {
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
  selectFilteredProducts,
} from "../../../redux/slice/filterSlice";

const ClientSidebar = ({
  categories,
  onCategoryChange,
  onPriceChange,
  catFilter,
  setCatFilter,
  priceFilter,
  setPriceFilter,
  filterProductsFunc,
}) => {
  // --------hooks-----------
  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();
  // -------states-----------
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [activeTab, setActiveTab] = useState("categories");
  const [isLaptopChecked, setILaptopChecked] = useState(false);
  const [isElectronicChecked, setIsElectronicChecked] = useState(false);
  const [isFashionChecked, setIsFashionChecked] = useState(false);
  const [isPhoneChecked, setIsPhoneChecked] = useState(false);
  // --------functions---------
  // price/category
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const handleFilterProducts = (category, priceRange) => {
    filterProductsFunc({ category: category, price: priceRange });
  };
  const handleCategoryChange = (category) => {
    if (category === "Laptop") {
      setILaptopChecked(!isLaptopChecked);
      setIsElectronicChecked(false);
      setIsFashionChecked(false);
      setIsPhoneChecked(false);
      setCatFilter(category);
      handleFilterProducts(category, priceRange);
      //dispatch(FILTER_BY_CATEGORY({ products, category }));
    } else if (category === "Electronics") {
      setIsElectronicChecked(!isElectronicChecked);
      setILaptopChecked(false);
      setIsFashionChecked(false);
      setIsPhoneChecked(false);
      setCatFilter(category);
      handleFilterProducts(category, priceRange);
      //(FILTER_BY_CATEGORY({ products, category }));
    } else if (category === "Clothing") {
      setIsFashionChecked(!isFashionChecked);
      setIsElectronicChecked(false);
      setILaptopChecked(false);
      setIsPhoneChecked(false);
      setCatFilter(category);
      handleFilterProducts(category, priceRange);
      //dispatch(FILTER_BY_CATEGORY({ products, category: "Clothing" }));
    } else if (category === "Phone") {
      setIsPhoneChecked(!isPhoneChecked);
      setIsFashionChecked(false);
      setIsElectronicChecked(false);
      setILaptopChecked(false);
      setCatFilter(category);
      //dispatch(FILTER_BY_CATEGORY({ products, category }));
      handleFilterProducts(category, priceRange);
    } else {
    }
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setPriceRange({ ...priceRange, [name]: parseInt(value) });
    setPriceFilter(priceRange);
    console.log(priceRange);

    dispatch(
      FILTER_BY_PRICE({
        products,
        minPrice: priceRange?.min,
        maxPrice: priceRange?.max,
      })
    );
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
                checked={isLaptopChecked}
                onChange={() => handleCategoryChange("Laptop")}
              />
              <label htmlFor="laptop">Laptop</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="electronics"
                name="electronics"
                checked={isElectronicChecked}
                onChange={() => handleCategoryChange("Electronics")}
              />
              <label htmlFor="electronics">Electronics</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="fashion"
                name="fashion"
                checked={isFashionChecked}
                onChange={() => handleCategoryChange("Clothing")}
              />
              <label htmlFor="fashion">Fashion</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="phone"
                name="phone"
                checked={isPhoneChecked}
                onChange={() => handleCategoryChange("Phone")}
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
            max={10000}
            value={priceRange.min}
            onChange={handlePriceChange}
          />
          <input
            type="range"
            name="max"
            min={0}
            max={10000}
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
