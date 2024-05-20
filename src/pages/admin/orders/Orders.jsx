import React, { useState, useEffect } from "react";
import styles from "./Orders.module.scss";
import useFetchCollection from "../../../custom-hooks/useFetchCollection/useFetchCollection";
import Loader from "../../../components/shared/loader/Loader";
import { getMessaging, getToken, onMessage } from "@firebase/messaging";
import { messaging } from "../../../firebase/config";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrders,
  // updateOrderApi,
  updateOrderStatus,
  selectOrders,
  selectIsFetchLoading,
  selectIsFilterLoading,
  selectIsUpdateLoading,
  selectUpdateOrderApi,
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
  const updateOrderApi = useSelector(selectUpdateOrderApi);
  // -------functions-------
  const handleUpdateOrder = (order) => {
    if (order.status === "pending") {
      dispatch(
        updateOrderStatus({ orderId: order?.id, newStatus: "completed" })
      );
    } else {
      dispatch(updateOrderStatus({ orderId: order?.id, newStatus: "pending" }));
    }
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
  const setupNotifications = async (title, body) => {
    try {
      // Request permission for notifications
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        // Get the FCM token
        const token = await getToken(messaging, {
          vapidKey:
            "BLjZbAVO_y6qjs9foTovJ4Zey_LlscwooyEQrgO47cCIMdQ9awkCkaWxaqTJG91KM7c1zCLW4FCoDGgxoTPmESc",
        });
        // const title = "Shop From Home";
        // const body = "This is the notification body";
        new Notification(title, {
          body: body,
          icon: "/favicons/android-chrome-512x512.png", // You can specify the icon for the notification
        });
      } else {
        console.log("Notification permission denied.");
      }
      // Handle foreground notifications

      onMessage(messaging, (payload) => {
        console.log("Foreground Message:", payload); // Extract information from the payload

        // Handle the notification or update your UI
        const { title, body } = payload.notification;

        // Show the notification to the user using browser's built-in notification API
        new Notification(title, {
          body: body,
          icon: "/path/to/icon.png", // You can specify the icon for the notification
        });
      });
    } catch (error) {
      console.error("Error setting up notifications:", error);
    }
  };
  // ---------effect--------
  // useEffect(() => {
  //   dispatch(fetchOrders());
  // }, [fetchTrigger]);
  useEffect(() => {
    dispatch(fetchOrders());
  }, []);
  useEffect(() => {
    setupNotifications(
      "Shop From Home",
      `Your order id: ${updateOrderApi?.response?.id} status has been updated`
    );
  }, [updateOrderApi]);
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
