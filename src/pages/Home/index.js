import React, { useEffect } from "react";
import "./style.css";
import Track from "../../components/Player/Track";
import { Popup, Grid } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import ArtistList from "../../components/artistList";
import { verifyToken } from "../../redux/features/auth/AuthSlice";

function Home() {
  const tracks = useSelector((state) => state?.tracks?.data?.docs);
  const onlyTrack = useSelector((state) => state?.onlyTrack?.data);
  const dispatch = useDispatch();


  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(verifyToken(localStorage.getItem("token")));
    }
  }, [dispatch]);

  return (
    <div className="home_wrapper">
      <div className="home_container">
        <div className="left_card">
          <div className="box">
            <div className="cover">
              <img src={onlyTrack.cover} alt='cover'/>
            </div>
            <div className="track_name">{onlyTrack.name}</div>
            <div className="artist_name">{onlyTrack.artist.map(art=>art.name)}</div>
          </div>
        </div>
        <div className="tracks_home_container">
        <ArtistList/>
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
                  ordenar por categoria <i className="fa-solid fa-chevron-down"></i>
                </div>
              }
            />
          </div>
          {tracks?.map((track) => {
            return <Track  key={track?._id} cover={track?.cover}  track={track?.name} artist={track?.artist.map((art)=>art.name)} url={track?.url} category={track?.category.map(cat=>cat.category)} id={track?._id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
