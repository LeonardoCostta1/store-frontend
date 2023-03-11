import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function IfLogged({ children }) {
  const authenticated = useSelector((state) => state.authenticated.value);
  if (authenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default IfLogged;
