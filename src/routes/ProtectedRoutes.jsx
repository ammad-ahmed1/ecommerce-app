import React from "react";

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/slice/authSlice";
const ProtectedRoutes = ({ children }) => {
  //const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoggedIn = true;
  if (!isLoggedIn) {
    return (
      // <>
      <Navigate to="/login" replace />
      // </>
    );
  }
  return children;
};
export default ProtectedRoutes;
