import React, { useState, useEffect } from "react";
import styles from "./Orders.module.scss";
import useFetchCollection from "../../../custom-hooks/useFetchCollection/useFetchCollection";

const Orders = () => {
  // ---------hooks---------
  const { data, isHookLoading, totalProducts } = useFetchCollection(
    "orders",
    1,
    3
  );

  // State to manage modal visibility and selected order
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Function to handle showing modal and setting selected order
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // Function to parse JSON strings into JavaScript objects
  const parseJSON = (str) => {
    try {
      return JSON.parse(str);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  };

  // Calculate total of subtotals
  const calculateTotal = () => {
    let total = 0;
    if (selectedOrder) {
      parseJSON(selectedOrder.products)?.forEach(
        (product) => (total += product.subtotal)
      );
    }
    return total;
  };

  // ---------effect--------
  useEffect(() => {
    // console.log(data);
  }, [data]);

  console.log(data);
  return (
    <div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Shipping City</th>
              <th>Shipping Address</th>
              <th>Name</th>
              <th>Email</th>
              <th>ZIP</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{parseJSON(order.shippingDetail).city}</td>
                <td>{parseJSON(order.shippingDetail).address}</td>
                <td>
                  {parseJSON(order.shippingDetail).firstName}{" "}
                  {parseJSON(order.shippingDetail).lastName}
                </td>
                <td>{parseJSON(order.shippingDetail).email}</td>
                <td>{parseJSON(order.shippingDetail).zip}</td>
                <td>
                  <button onClick={() => handleViewOrder(order)}>
                    View Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup for viewing order details */}
      {showModal && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <span className={styles.close} onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Order Details</h2>
            {selectedOrder && (
              <>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Product ID</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Sub-Category</th>
                      <th>Brand</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parseJSON(selectedOrder.products)?.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.subcategory}</td>
                        <td>{product.brand}</td>
                        <td>{product.price}</td>
                        <td>{product.cartQuantity}</td>
                        <td>{product.subTotal}</td>
                        <td>
                          <img src={product.images} alt={product.name} />
                        </td>
                        <td>
                          <button onClick={() => handleDispatch(product)}>
                            Dispatch
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className={styles.total}>
                  <strong>Total:</strong> {calculateTotal()}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
