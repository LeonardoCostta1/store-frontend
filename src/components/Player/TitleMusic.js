import React from "react";
import "./style.css";

function TitleMusic({ cover,sound, artist,category }) {
  return (
    <div className="music_information">
      <div className="music_information__cover">
        <img src={cover} alt="cover"/>
      </div>
      <div className="title-music">
        <div className="title-music__sound">{sound}</div>
        <div className="title-music__artist">{artist}</div>
      </div>
      <div className="category">{category}</div>
    </div>
  );
}

export default TitleMusic;
