import React from "react";

import "./style.css";
import Button from "../Button";

function Banner() {
  return (
    <div className="banner_wrapper">
      <div className="text_banner_container">
        <div className="text">start creating today with unlimeted sounds</div>
    
        <Button title={'continue'}/>
      </div>
    </div>
  );
}

export default Banner;
