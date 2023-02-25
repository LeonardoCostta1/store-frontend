import React from "react";
import Slider from "react-slick";
import "./style.css";
import Artist from "../artist";
import { useSelector } from "react-redux";

function ArtistList() {
  const artists = useSelector((state) => state?.tracks?.data?.docs);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows:false,
    centerMode:true,
    slidesToShow: 9,
    slidesToScroll: 9,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="artistList_wrapper">
      <Slider {...settings}>
        {artists?.map((artist,index) => {
          console.log(artist?.artist.map((art)=>art.name))

          return <Artist key={index} cover={artist?.cover} name={artist?.artist.map((art)=>art.name)}/>;
        })}
      </Slider>
    </div>
  );
}

export default ArtistList;
