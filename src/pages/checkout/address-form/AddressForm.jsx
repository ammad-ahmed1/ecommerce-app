// Checkout.js

import React, { useState } from "react";
import styles from "./CheckoutForm.module.scss"; // Import CSS module
import { useNavigate } from "react-router-dom";
const AddressForm = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      zip: "",
      country: "",
    });
    localStorage.setItem("orderDetail", JSON.stringify(formData));
    nav("/checkout");
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form className={styles.checkoutForm} onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          ZIP Code:
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default AddressForm;
