import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../services/firebase";
import { useDispatch } from "react-redux";
import { setauthenticatedFalse } from "../redux/features/authenticated";
import { removeDataPlan } from "../redux/features/plan/PlanSlice";
import { removeDataSubscribe } from "../redux/features/subscribe/SubscribeSlice";

export function useSignOut() {
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setauthenticatedFalse());
        dispatch(removeDataPlan());
        dispatch(removeDataSubscribe());
        navigate("/");
      })
      .catch((error) => {});
  };
  return [handleSignOut];
}
