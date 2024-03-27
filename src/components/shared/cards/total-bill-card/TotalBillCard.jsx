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

const TotalBillCard = ({ numberOfItems, totalBill, showBtn }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const prevURL = useSelector(selectPreviousURL);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

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

  let total = 0;
  if (cartItems.length > 0) {
    for (let i = 0; i < cartItems?.length; i++) {
      total += cartItems[i]?.subTotal;
    }
  }
  return (
    <div className={styles.totalBillCardDiv}>
      <div className={styles.totalBillCard}>
        {showBtn && (
          <a href="#" className={styles.continueShoppingBtn}>
            Continue Shopping
          </a>
        )}

        <div className={styles.cartInfo}>
          <p>Number of Items: {cartItems?.length}</p>
          <p>Total Bill: ${total}</p>
        </div>
        <button
          className={styles.checkoutBtn}
          onClick={(e) => {
            const res = checkURL();
            if (isLoggedIn) {
              navigate("/address-form");
            } else {
              navigate("/login/cart");
            }
            // navigate("/checkout")
          }}
          disabled={total === 0 ? true : false}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default TotalBillCard;
