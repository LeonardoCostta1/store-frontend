import React, { useEffect, useState } from "react";
import "./style.css";
import Logo from "../Logo";
import Button from "../Button";
import { Popup, Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSignOut } from "../../hooks/useSignOut";
import { useDispatch, useSelector } from "react-redux";
import usa from "../../assets/img/estadosunidos.svg";
import brasil from "../../assets/img/brasil.svg";
import { setEN, setPT } from "../../redux/features/translate/translateSlice";

function Menu() {
  const dispatch = useDispatch();

  const authenticated = useSelector((state) => state?.authenticated?.user);

  const translate = useSelector((state) => state?.translate?.value);

  const plan = useSelector((state) => state?.plan?.data);

  const [handleSignOut] = useSignOut();

  const [scroll, setScroll] = useState(false);

  
  const [flag, setFlag] = useState(usa);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  const handleLanguage = () => {
    if (translate === 'en-US') {

      dispatch(setPT());
      setFlag(brasil)

    }else{
      dispatch(setEN());
      setFlag(usa)
    }

  };

  return (
    <div className={`menu_wrapper ${scroll ? "active" : ""}`}>
      <div className="menu_container">
        <div className="menu_container_logo_and_drag">
          <Logo />
        </div>
        <div className="user_wrapper">

          <div className="language" onClick={() => handleLanguage()}>
            <img src={flag} alt="flag" />
          </div>

          {!plan ? (
            <Link to={"/checkout"}>
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
                      {!authenticated?.photoURL ? (
                        <img
                          src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                          alt="cover"
                        />
                      ) : (
                        <Image
                          src={authenticated?.photoURL}
                          size="medium"
                          circular
                        />
                      )}
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
