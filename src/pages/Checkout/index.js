import React, { useEffect, useState } from "react";
import { Radio } from "semantic-ui-react";
import Button from "../../components/Button";
import "./style.css";
import Title from "../../components/Title";
import { getCheckout } from "../../redux/features/checkout/CheckoutSLice";
import { useDispatch, useSelector } from "react-redux";
import $ from 'jquery';
function Checkout() {
  const user = useSelector((state) => state.authenticated.user);
  const dispatch = useDispatch();

  const [checkoutData] = useState({
    email: user.email,
    first_name: user.displayName,
    last_name: user.displayName,
    userId: user.uid
  });
  const getPixQrCode = () => {
    dispatch(getCheckout(checkoutData));
  };

  useEffect(()=>{
    $(document).ready(function(){
      $('.checkout_container .qrcode_image_container .box_plans').click(function(){
        $('.qrcode_image_container .box_plans').removeClass("actived");
        $(this).addClass("actived");
    });
    });
  },[])

  return (
    <div className="checkout">
      <div className="checkout_container">
        <div className="checkout__describe-of-product">
          <div className="checkout__describe-of-product-container">
            <div className="checkout__box-price-product">
              <h1>select Your plan</h1>
            </div>
            <div className="box_info_plan">
              <div className="text_info_plan">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries,
              </div>
            </div>

            <div className="terms">
              By clicking the “Subscribe” button, you agree to our Social
              License and your subscription will be effective immediately. Your
              subscription will automatically renew annually unless you cancel
              it. You can cancel at any time through your account settings or by
              contacting us, effective at the end of the billing period.
            </div>
          </div>
        </div>
        <div className="qrcode_image_container">


          <div className={`box_plans actived`}>
            <div className="description_container">
              <div className="title_plan">starter</div>
              <div className="decription_plan">
                Pick a subscription and try one month for free. Cancel anytime.
              </div>
            </div>

            <div className="price">R$ 19,90</div>
          </div>

          <div className={`box_plans`}>
            <div className="description_container">
              <div className="title_plan">standart</div>
              <div className="decription_plan">
                Pick a subscription and try one month for free. Cancel anytime.
              </div>
            </div>

            <div className="price">R$ 29,90</div>
          </div>

          <div className={`box_plans`}>
            <div className="description_container">
              <div className="title_plan">pro</div>
              <div className="decription_plan">
                Pick a subscription and try one month for free. Cancel anytime.
              </div>
            </div>

            <div className="price">R$ 59,90</div>
          </div>
          <Title title={"Payment Method"} />
          <div className="checkout__pix-paymente-container">
            <Radio label="Pix Payment" defaultChecked />
            <Button title="gerar pix" onClick={() => getPixQrCode()} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
