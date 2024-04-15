// BarGraph.js
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./BarGraph.module.scss";

const BarGraph = ({ data }) => {
  const dummyData = [
    { label: "Total Products", value: 100 },
    { label: "Sold Out", value: 40 },
    { label: "Investment Covered", value: 70 },
  ];
  return (
    <div className={styles.barGraphContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <h2 className={styles.chartTitle}>Orders Overview</h2>{" "}
        <BarChart data={dummyData}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraph;
