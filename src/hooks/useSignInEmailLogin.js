import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useState } from "react";

import { app } from "../services/firebase";

export function useSignInEmailLogin() {

  const auth = getAuth(app);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailLoginFirebase = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential;

        console.log(user)

      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      });
  };

  

  return [handleEmailLoginFirebase, handleEmailChange, handlePasswordChange, error];
}
