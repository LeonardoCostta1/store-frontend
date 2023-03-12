import React from "react";
import Title from "../../components/Title";
import "./style.css";
import {  useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state?.authenticated?.user);

  const subscribe = useSelector((state) => state?.subscribe?.data);

  const plan = useSelector((state) => state?.plan?.data);

  return (
    <div className="profile_wrapper">
      <div className="profile_container_all">
        <div className="profile_container">
          <Title title={"profile"} />
          <div className="box_profile">
            <div className="subtitle">Full Name</div>
            <div className="info">{user?.displayName}</div>
          </div>

          <div className="box_profile">
            <div className="subtitle">e-mail</div>
            <div className="info">{user?.email}</div>
          </div>

          <div className="box_profile">
            <div className="subtitle">preço</div>
            <div className="info">R$ {plan?.price}</div>
          </div>
          <div className="box_profile">
            <div className="subtitle">Full Name</div>
                <div className="boxed-myplan">
                  <div className="subtitle"><span>plano: </span>{plan?.name ? plan?.name : 'inscreva-se agora'}</div>
                  <div className="change-your-plan"><span>final do plano: </span>{subscribe?.endDate && subscribe?.endDate?.substring(0,10)}</div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
