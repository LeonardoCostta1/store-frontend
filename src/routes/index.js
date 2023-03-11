import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Protected from "./Protected";
import Loading from "../components/Loading";
import Profile from "../pages/Profile";
import { getTracks } from "../redux/features/tracks/TrackSlice";
import Checkout from "../pages/Checkout";
import { setauthenticatedTrue } from "../redux/features/authenticated";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../services/firebase";
import IfLogged from "./ifLogged";

function Router() {
  const auth = getAuth(app);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTracks());
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setauthenticatedTrue(user));
      }
    });
  }, [dispatch, auth]);

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

      <Route
        path="/load"
        element={
          <IfLogged>
            <Loading />
          </IfLogged>
        }
      />

      <Route
        path="/signin"
        element={
          <IfLogged>
            <Login />
          </IfLogged>
        }
      />
    </Routes>
  );
}

export default Router;
