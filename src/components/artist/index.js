import React from "react";

import "./style.css";

function Artist({ cover }) {
  return (
    <div className="artist_wrapper">
      <img src={cover} alt="cover" />
    </div>
  );
}

export default Artist;
