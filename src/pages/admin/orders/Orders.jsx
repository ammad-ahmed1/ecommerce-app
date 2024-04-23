import React, { useState, useEffect } from "react";
import styles from "./Orders.module.scss";
import useFetchCollection from "../../../custom-hooks/useFetchCollection/useFetchCollection";
import Loader from "../../../components/shared/loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrders,
  updateOrderStatus,
  UPDATE_STATUS,
  selectOrders,
  selectIsFetchLoading,
  selectIsFilterLoading,
  selectIsUpdateLoading,
} from "../../../redux/slice/orderSlice";

const Orders = () => {
  //----------states-------
  // State to manage modal visibility and selected order
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  // ---------hooks---------
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const isFetchLoading = useSelector(selectIsFetchLoading);
  const isUpdateLoading = useSelector(selectIsUpdateLoading);
  // -------functions-------

  const handleUpdateOrder = (order) => {
    if (order.status === "pending") {
      dispatch(
        updateOrderStatus({ orderId: order?.id, newStatus: "completed" })
      );
    } else {
      dispatch(updateOrderStatus({ orderId: order?.id, newStatus: "pending" }));
    }
    console.log(orders);
    // setFetchTrigger(!fetchTrigger);
  };

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
  // useEffect(() => {
  //   dispatch(fetchOrders());
  // }, [fetchTrigger]);
  useEffect(() => {
    dispatch(fetchOrders());
  }, []);
  // useEffect(() => {
  //   dispatch(fetchOrders());
  // }, [dispatch, fetchTrigger]);

  return (
    <div>
      {isFetchLoading || isUpdateLoading ? (
        <Loader />
      ) : (
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
                <th>Status</th>
                <th>View</th>
                <th>Delivered</th>
              </tr>
            </thead>
            <tbody>
              {orders?.orders?.map((order) => (
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
                  <td>{order?.status}</td>
                  <td>
                    <button onClick={() => handleViewOrder(order)}>
                      View Order
                    </button>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      // disabled={order?.status === "completed" ? true : false}
                      onClick={(e) => handleUpdateOrder(order)}
                      checked={order?.status === "completed" ? true : false}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
                    {selectedOrder.products?.map((product) => (
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
