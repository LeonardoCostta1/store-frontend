import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { getUser } from "../redux/features/user/userSlice";
import { getPlan } from "../redux/features/plan/PlanSlice";
import { getSubscribe } from "../redux/features/subscribe/SubscribeSlice";
import { getAllPlans } from "../redux/features/Plans/PlansSlice";
import { useTranslation } from "react-i18next";
function Router() {

  const auth = getAuth(app);

  const dispatch = useDispatch();

  const id = useSelector((state) => state?.user?.data);

  const subscribe = useSelector((state) => state?.subscribe?.data);

  const lang = useSelector((state) => state?.translate?.value);

  const { i18n } = useTranslation();

  useEffect(() => {

    i18n.changeLanguage(lang)
    dispatch(getTracks());
    dispatch(getAllPlans());
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getUser(user.email));
        dispatch(setauthenticatedTrue(user));
        dispatch(getSubscribe(id?._id));
        dispatch(getPlan(subscribe?.plan));
        
      }
    });
  }, [dispatch, auth,id?._id,subscribe?.plan,lang,i18n]);

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
