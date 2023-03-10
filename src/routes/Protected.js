import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Protected({ children }) {
  const authenticated = useSelector((state) => state.authenticated.value);
  if (!authenticated) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}
export default Protected;
