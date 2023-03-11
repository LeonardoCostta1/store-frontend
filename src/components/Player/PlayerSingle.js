import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import Button from "../Button";
import "./style.css";
import { http } from "../../services/axios";
function PlayerSingle({ cover, name, artist, category, audio, id }) {
  const [isPlaying, toggleIsPlaying] = useState(false);
  const containerRef = useRef();
  const waveSurferRef = useRef({
    isPlaying: () => false
  });

  const [duration, setDuration] = useState("0:00");
  const [current, setCurrent] = useState("0:00");

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      backend: "MediaElement",
      responsive: true,
      cursorWidth: 0,
      barWidth: 1,
      waveColor: "rgb(130,130,130)",
      progressColor: "#fff"
    });

    waveSurfer.load(audio);
    waveSurfer.on("ready", () => {
      waveSurferRef.current = waveSurfer;
      setDuration(waveSurfer.getDuration());
    });

    waveSurfer.on("audioprocess", function () {
      setCurrent(waveSurfer.getCurrentTime());
    });

    return () => {
      waveSurfer.destroy();
    };
  }, [audio]);

  const formatTime = function (time) {
    return [
      Math.floor((time % 3600) / 60), // minutes
      ("00" + Math.floor(time % 60)).slice(-2) // seconds
    ].join(":");
  };

  const togglelay = () => {
    waveSurferRef.current.playPause();
    toggleIsPlaying(waveSurferRef.current.isPlaying());
  };

  const downloadTrack = async (idtrack) => {
    try {
      const response = await http.get(`/track/${idtrack}/download`, {
        headers: {
          Authorization: process.env.REACT_APP_TOKEN_DEFAULT,
        }
      });
      console.log(response)
      return response.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <div className="player">
      <div className="music_information">
        <div className="music_information__cover">
          <img src={cover} alt="cover" />
        </div>
        <button onClick={() => togglelay()} type="button">
          {isPlaying ? (
            <i className="fa-solid fa-pause"></i>
          ) : (
            <i className="fa-solid fa-play"></i>
          )}
        </button>
        <div className="title-music">
          <div className="title-music__sound">{name}</div>
          <div className="title-music__artist">{artist}</div>
        </div>
      </div>
      <div className="category">{category}</div>
      <div className="wave_wrapper">
        <div className="wave_container" ref={containerRef} />
        <div className="duration">{`${formatTime(
          current === "0:00" ? 0 : current
        )} / ${formatTime(duration === "0:00" ? 0 : duration)}`}</div>
      </div>
      <Button
        title={'download'}
        type={"small"}
        onClick={() => downloadTrack(id)}
      />
    </div>
  );
}

export default PlayerSingle;
