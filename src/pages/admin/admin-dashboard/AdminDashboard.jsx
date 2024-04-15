import React, { useEffect, useState } from "react";

import styles from "./AdminDashboard.module.scss";
import SmallCard from "../../../components/shared/cards/small-card/SmallCard";
import BarGraph from "../../../components/graphs/bargraph/Bargraph";
import OrdersPieChart from "../../../components/graphs/piechart/PieChart";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../../../firebase/config";
import useFetchCollection from "../../../custom-hooks/useFetchCollection/useFetchCollection";

const AdminDashboard = () => {
  // ------states------
  const [ordersData, setOrdersData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(productsData, ".............................pd");
  // ------hooks-------
  const {
    data: d,
    isHookLoading: orderLoading,
    totalProducts: totalOrders,
  } = useFetchCollection("orders", 1, 200);
  const {
    data: productData,
    isHookLoading: productLoading,
    totalProducts: totalProductsNumber,
  } = useFetchCollection("products", 1, 200);
  console.log(productData);
  // const { data, isHookLoading, totalProducts } = useFetchCollection(
  //   "product",
  //   1,
  //   200
  // );
  console.log(productData);
  // ----functions-----
  const fetchData = async () => {
    setIsLoading(true); // Set loading state to true before fetching

    try {
      const ordersCollection = collection(db, "orders");
      const productsCollection = collection(db, "products");

      // **Optional for security:** If applicable, consider adding user-based filtering here using `where` clauses (explained later)

      const ordersQuery = query(ordersCollection); // Get all orders (replace with specific query if needed)
      const productsQuery = query(productsCollection); // Get all products (replace with specific query if needed)

      const ordersSnapshot = await getDocs(ordersQuery);
      const productsSnapshot = await getDocs(productsQuery);

      const fetchedOrders = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const fetchedProducts = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrdersData(fetchedOrders);
      setProductsData(fetchedProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Set loading state to false after fetching
    }
  };
  // -------effect-------
  useEffect(() => {
    fetchData();
  }, []);
  const data1 = {
    labels: ["Total Products", "Sold Out", "Investment Covered"],
    datasets: [
      {
        label: "Value",
        backgroundColor: ["#007bff", "#28a745", "#ffc107"],
        data: [100, 40, 70],
      },
    ],
  };
  return (
    <div>
      <div className={styles.cardContainer}>
        <SmallCard heading={"Total Products"} value={productsData.length} />
        <SmallCard heading={"Sold out"} value="3" />
        <SmallCard heading={"Inv. Covered"} value="28000" />
      </div>

      <div className={styles.cardContainer}>
        <BarGraph data={data1} />
        <OrdersPieChart />
      </div>
    </div>
  );
};

export default AdminDashboard;
