import React, { useState } from "react";
import { Radio } from "semantic-ui-react";
import Button from "../../components/Button";
import "./style.css";
import Title from "../../components/Title";
import { getCheckout } from "../../redux/features/checkout/CheckoutSLice";
import { useDispatch, useSelector } from "react-redux";
function Checkout() {
  const qrcode = useSelector(
    (state) =>
      state?.checkout?.data?.response?.point_of_interaction?.transaction_data
  );
  const user = useSelector((state) => state.auth.loggedIn);

  const trackProduct = useSelector((state) => state.checkout.track);

  const dispatch = useDispatch();

  const [checkoutData] = useState({
    transaction_amount: 0.01,
    description: trackProduct.track,
    email: user.email,
    first_name: user.name,
    last_name: trackProduct.id,
    userId: user._id
  });
  const getPixQrCode = () => {
    dispatch(getCheckout(checkoutData));
  };
  return (
    <div className="checkout">
      <div className="checkout__describe-of-product">
        <div className="checkout__describe-of-product-container">
          <Title title={"your plan"} />
          <div className="checkout__box-price-product">
            <Radio label="Annual" defaultChecked inverted />
            <div className="price">$19.99/month</div>
          </div>
          <div className="box_info_plan">
            <div className="text_info_plan">
              Get Artlist Max to add unlimited footage, video templates &
              editing software to your subscription
            </div>
          </div>

          <Title title={"Payment Method"} />

          <div className="checkout__pix-paymente-container">
            <Radio label="Pix Payment" defaultChecked inverted />
            <Button title="gerar pix" onClick={() => getPixQrCode()} />
          </div>

          <div className="checkout__box-price-product">
            <div className="qrcode_link">{qrcode?.qr_code}</div>
          </div>
        </div>
      </div>
      <div className="qrcode_image_container">
        <Title title={"your plan"} />

        <div className="total_billing">
          <Title title={"total billing"} />
          <div className="price">9.99</div>
        </div>
        <div className="qrcode_image">
          {qrcode?.qr_code_base64 && (
            <img
              src={`data:image/png;base64,${qrcode?.qr_code_base64}`}
              alt="Red dot"
            />
          )}
        </div>
        <div className="terms">
          By clicking the “Subscribe” button, you agree to our Social License
          and your subscription will be effective immediately. Your subscription
          will automatically renew annually unless you cancel it. You can cancel
          at any time through your account settings or by contacting us,
          effective at the end of the billing period.
        </div>
      </div>
    </div>
  );
}

export default Checkout;
