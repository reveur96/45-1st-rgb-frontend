import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckInput from "../CheckBox/CheckInput";
import "./Payment.scss";
import { API_ADDRESS } from "../../../../utils/API_ADDRESS";
import { fetchApi } from "../../../../utils/fetchApi";

function Payment({ userData, totalPrice, setIsDelivery, cartProductList }) {
  const [checkInputs, setCheckInputs] = useState([]);

  const activatedPaymentButtonCondition = checkInputs.length === 3;

  const totalPriceInComma = Number(totalPrice).toLocaleString();

  const navigate = useNavigate();

  const totalPoints = parseInt(userData?.points).toLocaleString();

  const handlePrevComponent = () => {
    setIsDelivery(true);
  };

  async function postOrderData() {
    const response = await fetchApi(`orders`, {
      method: "POST",
    });
    if (response.message === "Order placed successfully") {
      alert("결제 완료되었습니다");
      navigate(`/invoice/${response.orderNumber}`);
    } else if (
      response.message === "Not enough points to purchase all cart items"
    ) {
      alert("포인트가 부족합니다.");
    } else {
      alert("다시 시도해주세요.");
    }
  }

  const handlePayButton = e => {
    e.preventDefault();
    postOrderData();
    navigate("/invoice");
  };

  return (
    <div className="payment">
      <img
        className="goBackArrow"
        alt="left arrow"
        src="/images/Order/arrow2.png"
        onClick={handlePrevComponent}
      />
      <h2 className="paymentTitle">이대로 주문하시겠습니까?</h2>
      <form className="pointForm">
        <div className="pointTitle">
          <img alt="point logo" src="/images/Order/point_logo.png" />
          <span className="pointText">포인트</span>
        </div>
        <div>
          <label className="pointLabel" htmlFor="totalPoint">
            <div>
              <span>보유</span> <input type="text" id="totalPoint" readOnly />
            </div>
            <span className="pointUnit">{totalPoints}&nbsp;P</span>
          </label>
        </div>

        <div>
          <label className="pointLabel" htmlFor="pricePoint">
            <div>
              <span>사용</span> <input type="text" id="pricePoint" readOnly />
            </div>
            <span className="pointUnit">{totalPriceInComma}&nbsp;P</span>
          </label>
        </div>

        <div className="contractWrapper">
          <CheckInput
            checkInputs={checkInputs}
            setCheckInputs={setCheckInputs}
          />
        </div>
        <button
          className={
            !activatedPaymentButtonCondition
              ? `bigButton buttonOff`
              : `bigButton dark`
          }
          disabled={!activatedPaymentButtonCondition}
          onClick={handlePayButton}
        >
          결제하기
        </button>
      </form>
    </div>
  );
}

export default Payment;
