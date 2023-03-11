import React from "react";
import { Loader } from 'semantic-ui-react'
import "./style.css";

function Loading() {
  return (
    <div className={`loading_wrapper`}>
      <Loader active inline='centered' />
      <div className="text_loading">
        você será redirecionado em breve!
      </div>
    </div>
  );
}

export default Loading;
