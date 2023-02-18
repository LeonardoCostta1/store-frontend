import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function Protected({ children }) {
  const isSignedIn = useSelector((state) => state.auth.loggedIn);
  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}
export default Protected;
