import React from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import "./style.css";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.authenticated.user);
  console.log(user);
  return (
    <div className="profile_wrapper">
      <div className="profile_container_all">
        <div className="profile_container">
          <Title title={"profile"} />
          <div className="box_profile">
            <div className="subtitle">Full Name</div>
            <div className="info">{user.displayName}</div>
          </div>

          <div className="box_profile">
            <div className="subtitle">Full Name</div>
            <div className="info">{user.email}</div>
          </div>
          <Button title={"editar perfil"} />
          <div className="box_profile">
            <div className="subtitle">Full Name</div>
            <div className="boxed-myplan">
              <div className="subtitle">trial</div>
              <div className="change-your-plan">
                Subscribe to get unlimited downloads
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
