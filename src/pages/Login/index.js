import React from "react";

import "./style.css";
import Button from "../../components/Button";
import { useLoginFetch } from "../../hooks/useLoginFetch";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Login() {
  const [handleLogin, handleEmailChange, handlePasswordChange] =
    useLoginFetch();
  const authenticated = useSelector((state) => state.auth.loggedIn);
  if (authenticated) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <div className="login">
        <form className="login__form" onSubmit={handleLogin}>
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
            title={"sign in"}
            fill={"fill"}
            onClick={handleLogin}
          />
          <div className="login-form__forgot">Forgot your password?</div>
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
}

export default Login;
