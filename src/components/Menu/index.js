import React from "react";
import "./style.css";
import Logo from "../Logo";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { Popup, Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { logout } from "../../redux/features/auth/AuthSlice";
function Menu() {
  const auth = useSelector((state) => state.auth.loggedIn);
  const dispatch = useDispatch()

  return (
    <div className="menu_wrapper">
      <div className="menu_container">
        <Logo />
        <div className="user_wrapper">
          {!auth ? (
            <Link to={"/signin"}>
              <Button title={"subscribe now!"} type={"small"} />
            </Link>
          ) : null}
          {auth && (
            <Popup
              inverted
              wide
              flowing
              className="pop"
              content={
                <Grid centered divided columns={1} >
                  <Grid.Column textAlign="left">
                    <div className="signout">
                      <Link to={"/profile"}>profile</Link>
                    </div>
                    <div className="signout" onClick={() => dispatch(logout())}>
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
                  <div className="username_text">
                    {!auth?.name ? auth?.email : auth?.name}
                  </div>

                  <div className="user_photo">
                    <div className="icon_top user_container">
                      <Image
                        src="https://react.semantic-ui.com/images/wireframe/square-image.png"
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
