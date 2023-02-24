import React from "react";

import "./style.css";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className="logo">
     
      <Link to={"/"}> <div className="boxlogo"></div> sonora</Link>
    </div>
  );
}

export default Logo;
