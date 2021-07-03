import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

const OrderConfirmation = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch(() => setError(true));
  }, []);

  function handleClick() {
    resetOrder();

    setOrderPhase("inProgress");
  }

  const getContent = () => {
    if (error) {
      return <AlertBanner />;
    }

    return (
      <>
        <h1>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: "25%" }}>
          as per our terms and conditions, nothing will happen now
        </p>
      </>
    );
  };

  if (orderNumber) {
    return (
      <>
        {getContent()}
        <div style={{ textAlign: "center" }}>
          <Button onClick={handleClick}>Create new order</Button>
        </div>
      </>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default OrderConfirmation;
