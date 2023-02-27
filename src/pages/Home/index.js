import React, { useEffect } from "react";
import "./style.css";
import Banner from "../../components/Banner";
import { Popup, Grid } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import ArtistList from "../../components/artistList";
import { verifyToken } from "../../redux/features/auth/AuthSlice";
import PlayerSingle from "../../components/Player/PlayerSingle";

function Home() {
  const tracks = useSelector((state) => state?.tracks?.data?.docs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(verifyToken(localStorage.getItem("token")));
    }
  }, [dispatch]);

  return (
    <div className="home_wrapper">
      <Banner />
      <div className="home_container">
        <div className="tracks_home_container">
          <ArtistList />
          <div className="filter_container">
            <Popup
              inverted
              wide
              flowing
              content={
                <Grid centered divided columns={1}>
                  <Grid.Column textAlign="left">
                    <div className="signout">profile</div>
                    <div className="signout">sign out</div>
                  </Grid.Column>
                </Grid>
              }
              on="click"
              position="bottom right"
              popper={{ id: "popper-container", style: { zIndex: 2000 } }}
              trigger={
                <div className="filter_name">
                  ordenar por categoria{" "}
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              }
            />
          </div>
          {tracks?.map((track) => {
            return (
              <PlayerSingle
                key={track?._id}
                cover={track?.cover}
                name={track?.name}
                artist={track?.artist.map((art) => art.name)}
                category={track?.category.map((cat) => cat?.category)}
                id={track?._id}
                audio={`${process.env.REACT_APP_API_REQUEST}/musicas/${track?._id}/play`}
                price={track?.price}
                track={tracks}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
