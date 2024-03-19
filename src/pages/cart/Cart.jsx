import React from "react";
import styles from "./Cart.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { REMOVE_FROM_CART, selectCartItems } from "../../redux/slice/cartSlice";
import { ADD_TO_CART, DEACREASE_FROM_CART } from "../../redux/slice/cartSlice";
import TotalBillCard from "../../components/shared/cards/total-bill-card/TotalBillCard";
const Cart = () => {
  //--------hooks--------
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  let total;
  let bill = cartItems?.map((item) => {
    //total += item.price * item.cartQuantity;
  });
  //console.log(bill);
  //---------functions---------
  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
  };
  const decreaseFromCart = (product) => {
    dispatch(DEACREASE_FROM_CART(product));
  };
  const deleteFromCart = (product) => {
    dispatch(REMOVE_FROM_CART(product));
  };
  return (
    <div className={styles["cart-container"]}>
      <h2>Your Cart</h2>
      <div className={styles["cart-items"]}>
        {cartItems?.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className={styles["cart-items-wrapper"]}>
            <table className={styles["cart-table"]}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.images}
                        alt={item.name}
                        className={styles["product-image"]}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>
                      <div className={styles["quantity-controls"]}>
                        <button onClick={() => decreaseFromCart(item)}>
                          -
                        </button>
                        <span className={styles["product-quantity"]}>
                          {item.cartQuantity}
                        </span>
                        <button onClick={() => addToCart(item)}>+</button>
                      </div>
                    </td>
                    <td>${item?.cartQuantity * item?.price}</td>
                    <td>
                      <button
                        className={styles["delete-button"]}
                        onClick={() => deleteFromCart(item)}
                      >
                        <img
                          src="/icons/delete-icon.png"
                          style={{
                            height: "16px",
                          }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className={styles["bill-card"]}>
        <TotalBillCard />
      </div>
    </div>
  );
};

export default Cart;
