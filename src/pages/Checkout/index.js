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

  const [checkoutData]= useState({
    transaction_amount:0.01,
    description:trackProduct.track,
    email:user.email,
    first_name:user.name,
    last_name:trackProduct.id,
    userId:user._id
  })
  const getPixQrCode = () => {
    dispatch(
      getCheckout(
        checkoutData
      )
    );
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

          <Title title={"Payment Method"} />

          <div className="checkout__pix-paymente-container">
            <Radio label="Pix Payment" defaultChecked inverted />
            <Button title="gerar pix" onClick={() => getPixQrCode()} />
          </div>
          <div className="qrcode_image">
            <img
              src={`data:image/png;base64,${qrcode?.qr_code_base64}`}
              alt="Red dot"
            />
          </div>
          <div className="checkout__box-price-product">
            <div className="qrcode_link">{qrcode?.qr_code}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
