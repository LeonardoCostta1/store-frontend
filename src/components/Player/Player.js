import React, { useState } from "react";
import "./style.css";
import TitleMusic from "./TitleMusic";
import Wave from "./Wave";
import { useSelector } from "react-redux";

function Player() {
  const track = useSelector(state=>state?.onlyTrack?.data)
  const [vol, setVol] = useState(0.5);
  return (
    <div className="player_bottom">
      <div className="player__container">
        <TitleMusic
        cover={track?.cover}
          sound={track?.name}
          artist={track?.artist.map((art)=>art?.name)}
        />
        <Wave audio={'http://localhost:3333/api/musicas/63f967c745d132cd8dd27e89/play'} volume={vol}/>

        <div className="vol_container">
        <input
        className="slider"
          id="volume"
          type="range"
          min="0"
          max="1"
          value={vol}
          step="0.1"
          onChange={(e) => setVol(e.target.value)}
        />
      </div>
      </div>
    </div>
  );
}

export default Player;
