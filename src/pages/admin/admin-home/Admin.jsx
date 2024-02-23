import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./Admin.module.scss";
import Sidebar from "../../../components/admin-only/sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { Footer, Header } from "../../../components";

const Admin = () => {
  const loc = useLocation();
  return (
    <div>
      <div className="header">{/* <Header /> */}</div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content"></div>
    </div>
  );
};

export default Admin;
