import React, { useEffect, useState } from "react";
import styles from "./AdminDashboard.module.scss";
import SmallCard from "../../../components/shared/cards/small-card/SmallCard";
import BarGraph from "../../../components/graphs/bargraph/Bargraph";
import OrdersPieChart from "../../../components/graphs/piechart/PieChart";
import useFetchCollection from "../../../custom-hooks/useFetchCollection/useFetchCollection";
import Loader from "../../../components/shared/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  selectOrders,
  selectFilteredOrders,
  selectCompletedOrders,
  selectPendingOrders,
  // selectFilteredOrders,
  // selectIsFetchLoading,
  // selectIsFilterLoading,
  fetchOrders,
  filterOrders,
} from "../../../redux/slice/orderSlice";

const AdminDashboard = () => {
  // ------states------
  // const [orders, setOrders] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [percentage, setPercentage] = useState({});
  // ------hooks-------
  const orders = useSelector(selectOrders);
  const filteredOrders = useSelector(selectFilteredOrders);
  const completedOrders = useSelector(selectCompletedOrders);
  const pendingOrders = useSelector(selectPendingOrders);
  const dispatch = useDispatch();
  const { data: data1, isHookLoading: isHookLoading1 } = useFetchCollection(
    "product",
    1,
    200
  );
  const { data: data2, isHookLoading: isHookLoading2 } = useFetchCollection(
    "orders",
    1,
    200
  );
  // ----functions-----
  const calTotalBill = () => {
    var total = 0;
    data2?.map((item) => {
      total += item?.bill;
    });
    return total;
  };
  const ordersPercentage = (completedOrders, pendingOrders, orders) => {
    const totalPercentage = 100; // Constant for calculating percentages
    // Calculate percentages (avoid potential division by zero)
    const completedNumber = completedOrders?.length;
    const pendingNumber = pendingOrders?.length;
    const pendingPercentage = (pendingNumber / orders?.orders?.length) * 100;

    const completedPercentage =
      (completedNumber / orders?.orders?.length) * 100;
    // Round percentages to two decimal places (optional)

    setPercentage({ pendingPercentage, completedPercentage });
    // return percentage;
  };
  // -------effect-------
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  useEffect(() => {
    dispatch(filterOrders("pending"));
  }, [dispatch]);
  useEffect(() => {
    dispatch(filterOrders("completed"));
  }, [dispatch]);
  useEffect(() => {
    ordersPercentage(completedOrders, pendingOrders, orders);
  }, [dispatch]);
  useEffect(() => {
    let total = 0;
    orders?.orders?.map((item) => {
      total += item?.bill;
    });
    setTotalSales(total);
  }, []);

  // useEffect(() => {
  //   // Query pending orders
  //   const pendingQuery = db
  //     .collection("orders")
  //     .where("status", "==", "pending");
  //   const unsubscribePending = pendingQuery.onSnapshot((snapshot) => {
  //     const pendingOrdersData = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setPendingOrders(pendingOrdersData);
  //   });

  //   // Query completed orders
  //   const completedQuery = db
  //     .collection("orders")
  //     .where("status", "==", "completed");
  //   const unsubscribeCompleted = completedQuery.onSnapshot((snapshot) => {
  //     const completedOrdersData = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setCompletedOrders(completedOrdersData);
  //   });

  //   return () => {
  //     unsubscribePending();
  //     unsubscribeCompleted();
  //   };
  // }, []);
  const data = {
    labels: ["Total Products", "Orders", "Investment Covered"],
    datasets: [
      {
        label: "Value",
        backgroundColor: ["#007bff", "#28a745", "#ffc107"],
        data: [data1?.length, data2?.length, 70],
      },
    ],
  };
  return (
    <>
      {isHookLoading1 || isHookLoading2 ? (
        <Loader />
      ) : (
        <div>
          <div className={styles.cardContainer}>
            <SmallCard heading={"Total Products"} value={data1.length} />
            <SmallCard heading={"Orders"} value={data2?.length} />
            <SmallCard heading={"Sales"} value={calTotalBill()} />
          </div>
          <div className={styles.cardContainer}>
            <BarGraph data={data} />
            <OrdersPieChart data={percentage} />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
