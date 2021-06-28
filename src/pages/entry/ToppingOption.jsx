import React from "react";
import { Col, Form } from "react-bootstrap";

const ToppingOption = ({ name, imagePath, updateItemCount }) => {
  const handleChange = (event) => {
    updateItemCount(name, event.target.checked ? 1 : 0);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        alt={`${name} topping`}
        src={`http://localhost:3030/${imagePath}`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Col xs="6" style={{ textAlign: "left" }}>
          <Form.Check type="checkbox" onChange={handleChange} label={name} />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;
