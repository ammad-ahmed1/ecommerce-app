import React from "react";
import styles from "./OrderHistory.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { selectEmail } from "../../redux/slice/authSlice";
import useFetchCollectionByID from "../../custom-hooks/useFetchCollectionById/useFetchCollectionById";
useFetchCollectionByID;
const OrderHistory = () => {
  // --------states----------
  // --------hooks-----------
  const userEmail = useSelector(selectEmail);
  const { data, isHookLoading, totalProducts } = useFetchCollectionByID(
    "orders",
    1,
    200,
    userEmail
  );
  console.log(data);
  // -------functions--------
  // --------effect----------
  return <div>OrderHistory</div>;
};

export default OrderHistory;
