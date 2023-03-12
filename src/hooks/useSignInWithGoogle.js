import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useState } from "react";
import { app } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { setauthenticatedTrue } from "../redux/features/authenticated";
import { http } from "../services/axios";

const provider = new GoogleAuthProvider();

export function useSignInWithGoogle() {

  const auth = getAuth(app);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignInWithGoogle = () => {

    navigate("/load");

    signInWithRedirect(auth, provider)
      .then((result) => {
        const { uid, email, displayName } = result.user;
        http
          .post(
            "/user",
            { name: displayName, email, uid },
            {
              headers: {
                Authorization: process.env.REACT_APP_TOKEN_DEFAULT
              }
            }
          )
          .then(() => {
            console.log("usuario cadastrado com sucesso!");
          })
          .catch((err) => {
            console.log(err);
          });
        GoogleAuthProvider.credentialFromResult(result);
        setauthenticatedTrue(result);
      })
      .catch((error) => {
        setError(error.message);

        GoogleAuthProvider.credentialFromError(error);
      });
  };
  return [handleSignInWithGoogle, error];
}
