import React, { useEffect, useState } from "react";
import styles from "./OrderHistory.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { selectEmail } from "../../redux/slice/authSlice";
import Loader from "../../components/shared/loader/Loader";
import {
  selectOrdersByEmail,
  selectIsFetchLoading,
  fetchOrdersByEmail,
} from "../../redux/slice/orderSlice";

const OrderHistory = () => {
  // --------states----------
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  // --------hooks-----------
  const dispatch = useDispatch();
  const userEmail = useSelector(selectEmail);
  const ordersByEmail = useSelector(selectOrdersByEmail);
  const isFetchLoading = useSelector(selectIsFetchLoading);

  console.log(userEmail);
  // -------functions--------
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // --------effect----------
  useEffect(() => {
    dispatch(fetchOrdersByEmail(userEmail));
  }, []);
  return (
    <div>
      {isFetchLoading ? (
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
              {" "}
              z
              {ordersByEmail?.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.shippingDetail.city}</td>
                  <td>{order.shippingDetail.address}</td>
                  <td>
                    {order.shippingDetail.firstName}{" "}
                    {order.shippingDetail.lastName}
                  </td>
                  <td>{order.shippingDetail.email}</td>
                  <td>{order.shippingDetail.zip}</td>
                  <td>{order?.status}</td>
                  <td>
                    <button onClick={() => handleViewOrder(order)}>
                      View Order
                    </button>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      disabled={order?.status === "completed" ? true : false}
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
                    {parseJSON(ordersByEmail.products)?.map((product) => (
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

export default OrderHistory;
