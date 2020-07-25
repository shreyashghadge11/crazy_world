import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const Ordernow = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delivery Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Delivery address</Form.Label>
            <Form.Control type="text" placeholder="Enter address" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contact No.</Form.Label>
            <Form.Control type="text" placeholder="Mobile No" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>PAY NOW</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Ordernow;
