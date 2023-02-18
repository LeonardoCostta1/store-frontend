import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/Loading";
import Login from "../pages/Login";
import Protected from "./Protected";
import App from "../App";

import { useDispatch, useSelector } from "react-redux";
import { setToken, verifyToken } from "../features/auth/AuthSlice";

function Router() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const loading = useSelector((state) => state.loading.value);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(verifyToken(localStorage.getItem("token")));
    }
  }, [dispatch]);

  if (!loggedIn) {
    return <Login onLogin={(token) => dispatch(setToken(token))} />;
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Protected>
            <App />
          </Protected>
        }
      />
      <Route path="/signin" element={<Login />} />
    </Routes>
  );
}

export default Router;
