import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyToken } from "../redux/features/auth/AuthSlice";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Protected from "./Protected";
import Profile from "../pages/Profile";
import { getTracks } from "../redux/features/tracks/TrackSlice";
import { getOnlyTracks } from "../redux/features/onlyTrack/OnlyTrackSlice";
import Checkout from "../pages/Checkout";

function Router() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(verifyToken(localStorage.getItem("token")));
    }
    dispatch(getTracks());
    dispatch(getOnlyTracks());
  }, [dispatch]);
  return (
    <Routes>
      <Route
        path="/profile"
        element={
          <Protected>
            <Profile />
          </Protected>
        }
      />
      <Route
        path="/checkout"
        element={
          <Protected>
            <Checkout />
          </Protected>
        }
      />
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Login />} />
    </Routes>
  );
}

export default Router;
