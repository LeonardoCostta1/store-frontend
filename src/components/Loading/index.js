import React from "react";
import { Loader } from "semantic-ui-react";
import "./style.css";

function Loading({display}) {
  return (
    <div className={`loading_wrapper ${display}`}>
      <Loader active inline="centered" />
    </div>
  );
}

export default Loading;
