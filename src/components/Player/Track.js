import React from "react";
import "./style.css";
import TitleMusic from "./TitleMusic";
import Wave from "./Wave";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { setTrackToCheckout } from "../../redux/features/checkout/CheckoutSLice";
import { useDispatch } from "react-redux";

function Track({ cover, track, artist, url, category, id }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const addTrackToCheckout = () => {
    dispatch(setTrackToCheckout({ id, track }));
    navigate("/checkout");
  };
  return (
    <div className="track_container">
      <TitleMusic
        cover={cover}
        sound={track}
        artist={artist}
        category={category}
      />
      <Wave audio={url} id={id} display={"none"} />
      <Button title={"R$17.99"} type={"small"} onClick={addTrackToCheckout} />
    </div>
  );
}

export default Track;
