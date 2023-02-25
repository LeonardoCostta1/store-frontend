import React from "react";

import "./style.css";
import Button from "../Button";
import bg from "../../assets/bgmin.mp4";

function Banner() {
  return (
    <div className="banner_wrapper">
      <div className="overlay" />
      <video id="background-video" loop autoPlay>
        <source src={bg} type="video/mp4" />
      </video>
      <div className="text_banner_container">
        <div className="text">start creating today with unlimeted sounds</div>

        <Button title={"continue"} />
      </div>
    </div>
  );
}

export default Banner;
