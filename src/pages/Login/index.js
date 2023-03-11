import React from "react";

import "./style.css";
import Button from "../../components/Button";
import { useSelector } from "react-redux";
import { Loader } from "semantic-ui-react";
import { useSignInEmailLogin } from "../../hooks/useSignInEmailLogin";
import { useSignInWithGoogle } from "../../hooks/useSignInWithGoogle";
function Login() {

  const [handleEmailLoginFirebase, handleEmailChange, handlePasswordChange] = useSignInEmailLogin();

  const [handleSignInWithGoogle] = useSignInWithGoogle()
  
  const loading = useSelector((state) => state.loading.value);

    return (
      <div className="login">
        <form className="login__form" onSubmit={handleEmailLoginFirebase}>
          <div className="login-form__description">log into you accout</div>
          <input
            className="login-form__input"
            placeholder="e-mail"
            type="text"
            onChange={handleEmailChange}
          ></input>
          <input
            className="login-form__input"
            placeholder="password"
            type="password"
            onChange={handlePasswordChange}
          ></input>
          <Button
            type={"primary"}
            title={loading ? <Loader active inline="centered" /> : "sign in"}
            fill={"fill"}
            onClick={handleEmailLoginFirebase}
          />
          <div className="login-form__forgot">Forgot your password?</div>

          <Button
            type={"google"}
            title={loading ? <Loader active inline="centered" /> : "Google"}
            fill={"fill"}
            onClick={handleSignInWithGoogle}
          />
          <div className="login-form__terms-container">
            <div className="login_form__terms-text">
              By continuing,you agree to Splice´s Terms of Use and Privacy
              Policy
            </div>
          </div>
        </form>
      </div>
    );
  }
export default Login;
