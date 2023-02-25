import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import Button from "../Button";
import "./style.css";
import { getOnlyTracks } from "../../redux/features/onlyTrack/OnlyTrackSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTrackToCheckout } from "../../redux/features/checkout/CheckoutSLice";
function PlayerSingle({ cover, name, artist, category, audio, id, price }) {
  const [isPlaying, toggleIsPlaying] = useState(false);
  const dispatch = useDispatch();
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
    if (waveSurferRef.current.isPlaying()) dispatch(getOnlyTracks(id));
  };

  const navigate = useNavigate();
  const addTrackToCheckout = () => {
    dispatch(setTrackToCheckout({ id }));
    navigate("/checkout");
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
        title={price}
        type={"small"}
        onClick={() => addTrackToCheckout()}
      />
    </div>
  );
}

export default PlayerSingle;
