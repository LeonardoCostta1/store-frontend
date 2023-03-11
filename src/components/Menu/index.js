import React, { useEffect, useState } from "react";
import "./style.css";
import Logo from "../Logo";
import Button from "../Button";
import { Popup, Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSignOut } from "../../hooks/useSignOut";
import { useSelector } from "react-redux";
function Menu() {
  const authenticated = useSelector((state) => state.authenticated.user);

  console.log(authenticated?.photoURL);

  const [handleSignOut] = useSignOut();

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  return (
    <div className={`menu_wrapper ${scroll ? "active" : ""}`}>
      <div className="menu_container">
        <div className="menu_container_logo_and_drag">
          <div className="logo_drag_container">
            <div />
            <div />
            <div />
          </div>
          <Logo />
        </div>

        <div className="user_wrapper">
          {!authenticated ? (
            <Link to={"/signin"}>
              <Button title={"subscribe now!"} type={"small"} />
            </Link>
          ) : null}
          {authenticated && (
            <Popup
              inverted
              wide
              flowing
              className="pop"
              content={
                <Grid centered divided columns={1}>
                  <Grid.Column textAlign="left">
                    <div className="signout">
                      <Link to={"/profile"}>profile</Link>
                    </div>
                    <div className="signout" onClick={handleSignOut}>
                      sign out
                    </div>
                  </Grid.Column>
                </Grid>
              }
              on="click"
              position="bottom right"
              popper={{ id: "popper-container", style: { zIndex: 2000 } }}
              trigger={
                <div className="username_container">
                  <div className="user_photo">
                    <div className="icon_top user_container">
                      <Image
                        src={`${
                          authenticated?.photoURL
                            ? authenticated?.photoURL
                            : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                        }`}
                        size="medium"
                        circular
                      />
                    </div>
                  </div>
                </div>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Menu;
