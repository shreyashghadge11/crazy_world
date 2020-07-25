import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const Trackorder = (props) => {
  // const [userlogin,setUser] = React.useState(true);

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{}}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Track Your Order Here
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Tracking Id </Form.Label>
            <Form.Control type="email" placeholder="Enter Tracking ID" />
            <Form.Text className="text-muted">
              Your orders tracking id has been mailed to you.
            </Form.Text>
          </Form.Group>

          <Button
            variant="warning"
            className=""
            type="submit"
            onClick={(e) => e.preventDefault()}
          >
            Track Order
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Trackorder;
