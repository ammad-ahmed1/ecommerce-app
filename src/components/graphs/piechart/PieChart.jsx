import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import styles from "./OrdersPieChart.module.scss"; // Import SCSS module

const data = [
  { name: "Delivered", value: 80 },
  { name: "Pending", value: 20 },
];

const COLORS = ["#0088FE", "#FFBB28"];

const OrdersPieChart = () => {
  return (
    <div className={styles.chartContainer}>
      {" "}
      {/* Apply styles */}
      <h2 className={styles.chartTitle}>Orders Overview</h2>{" "}
      {/* Apply styles */}
      <PieChart width={600} height={400}>
        <Pie
          data={data}
          cx={300}
          cy={200}
          labelLine={false}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
            const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
            return (
              <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
              >
                {`${(percent * 100).toFixed(0)}%`}
              </text>
            );
          }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
};

export default OrdersPieChart;
