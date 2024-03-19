// TotalBill.jsx
import React, { useEffect } from "react";
import styles from "./TotalBillCard.module.scss"; // Importing the style module
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotalAmount,
  selectPreviousURL,
  TOTAL_BILL,
  SET_PREVIOUS_URL,
  CLEAR_PREVIOUS_URL,
} from "../../../../redux/slice/cartSlice";
import { selectIsLoggedIn } from "../../../../redux/slice/authSlice";

const TotalBillCard = ({ numberOfItems, totalBill }) => {
  const prevURL = useSelector(selectPreviousURL);
  const navigate = useNavigate();
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const checkURL = () => {
    if (isLoggedIn) {
      dispatch(SET_PREVIOUS_URL("cart"));
      return prevURL;
    } else {
      return prevURL;
      // useDispatch(CLEAR_PREVIOUS_URL());
    }
  };
  useEffect(() => {
    dispatch(TOTAL_BILL());
  }, []);
  const cartItems = useSelector(selectCartItems);
  let total = 0;
  for (let i = 0; i < cartItems?.length; i++) {
    total += cartItems[i]?.subTotal;
  }
  return (
    <div className={styles.totalBillCardDiv}>
      <div className={styles.totalBillCard}>
        <a href="#" className={styles.continueShoppingBtn}>
          Continue Shopping
        </a>
        <div className={styles.cartInfo}>
          <p>Number of Items: {cartItems?.length}</p>
          <p>Total Bill: ${total}</p>
        </div>
        <button
          className={styles.checkoutBtn}
          onClick={(e) => {
            const res = checkURL();
            if (isLoggedIn) {
              navigate("/checkout");
            } else {
              navigate("/login/cart");
            }
            // navigate("/checkout")
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default TotalBillCard;
