import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { context } from "../App";

const PrivateRouter = ({ children, role = [] }) => {
  const isToken = sessionStorage.getItem("token");
  const { userRole } = useContext(context);
  if (!isToken) {
    return <Navigate to="/" />;
  }
  if (role.includes(userRole)) {
    return children;
  }
};

export default PrivateRouter;
