// TotalBill.jsx
import React, { useEffect } from "react";
import styles from "./TotalBillCard.module.scss"; // Importing the style module
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotalAmount,
  TOTAL_BILL,
} from "../../../../redux/slice/cartSlice";
function TotalBillCard({ numberOfItems, totalBill }) {
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const dispatch = useDispatch();
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
        <button className={styles.checkoutBtn}>Checkout</button>
      </div>
    </div>
  );
}

export default TotalBillCard;
