import React from "react";

import "./style.css";

function Button({ title, type, fill, onClick }) {
  return (
    <div className={`btn btn--${type} btn--${fill}`} onClick={onClick}>
      {title}
    </div>
  );
}

export default Button;
