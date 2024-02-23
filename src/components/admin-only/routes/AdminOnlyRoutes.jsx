import React from "react";
import { useSelector } from "react-redux";
import { selectEmail } from "../../../redux/slice/authSlice";
const AdminOnlyRoutes = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === "iammadmughal480@gmail.com") {
    return children;
  }
  return null;
};

export default AdminOnlyRoutes;
