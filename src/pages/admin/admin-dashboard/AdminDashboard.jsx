import React from "react";
import styles from "./AdminDashboard.module.scss";
import SmallCard from "../../../components/shared/cards/small-card/SmallCard";
// import BarGraph from "../../../components/graphs/bargraph/Bargraph";

const AdminDashboard = () => {
  const data = {
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
        <SmallCard heading={"Total Products"} value="10" />
        <SmallCard heading={"Sold out"} value="3" />
        <SmallCard heading={"Inv. Covered"} value="28000" />
      </div>
      <div>{/* <BarGraph data={data} /> */}</div>
    </div>
  );
};

export default AdminDashboard;
