import React from "react";

import "./style.css";

function Artist({ cover, name }) {
  return (
    <div className="artist_box_container">
      <div className="artist_wrapper">
        <img src={cover} alt="cover" />
      </div>
      <div className="artist_name">{name}</div>
    </div>
  );
}

export default Artist;
