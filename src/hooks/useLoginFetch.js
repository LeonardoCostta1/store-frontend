import { useState } from "react";
import { http } from "../services/axios";
import { useDispatch } from "react-redux";
import {
  setLoadingFalse,
  setLoadingTrue
} from "../features/loading/LoadingSlice";
import { verifyToken } from "../features/auth/AuthSlice";

export function useLoginFetch() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleEmailChange = (event) => {
    setEmail(event.target.value.toString());
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value.toString());
  };

  const handleLogin = async (event) => {
    dispatch(setLoadingTrue());
    event.preventDefault();
    await http
      .post("/login", {
        email,
        password
      })
      .then((response) => {
        localStorage.setItem("token", response.data.tokens.token);
        verifyToken(response.data.tokens.token);
        dispatch(setLoadingFalse());
      })
      .catch((error) => {
        dispatch(setLoadingFalse());
        setError(error);
      });
  };
  return [handleLogin, handleEmailChange, handlePasswordChange, error];
}
