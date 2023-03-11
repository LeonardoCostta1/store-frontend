import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../services/firebase";
import { useDispatch } from "react-redux";
import { setauthenticatedFalse } from "../redux/features/authenticated";

export function useSignOut() {
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setauthenticatedFalse());
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return [handleSignOut];
}
