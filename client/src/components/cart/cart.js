import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Cartlist from "./cartlist";
import { CartContext } from "../../context/cartprovider";
import { AuthContext } from "../../context/authprovider";
// import StripeCheckout from "react-stripe-checkout";
// import axios from "axios";

const Cart = (props) => {
  const { cartstate, removefromcart, placeorder } = useContext(CartContext);
  const { authstate } = useContext(AuthContext);
  // const [orderShow, setOrderShow] = React.useState(false);
  const [delivery, setDelivery] = useState({
    address: "",
    mobileno: "",
  });
  // var total=0
  const gettotal = () => {
    var total = 0;
    cartstate.mycart.map(
      (item) => (total = total + item.productprice * item.quantity)
    );
    return total;
  };

  const handlechange = (e) => {
    if (e.target.type === "text") {
      setDelivery({ ...delivery, address: e.target.value });
    } else {
      setDelivery({ ...delivery, mobileno: e.target.value });
    }
  };

  const handleorders = () => {
    placeorder({
      email: authstate.user.email,
      address: delivery.address,
      mobileno: delivery.mobileno,
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ textAlign: "center" }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">My Cart</Modal.Title>
        {cartstate.carterrors ? <p>{cartstate.carterrors.error}</p> : null}
      </Modal.Header>
      <Modal.Body>
        <Cartlist
          cart={cartstate.mycart}
          removefromcart={removefromcart}
          user={authstate.user}
          guest={cartstate.guestcart}
          userauth={authstate.isAuthenticated}
        />
        {authstate.isAuthenticated ? (
          <h2
            className="container"
            style={{
              width: "300px",
              margin: "10px auto",
              fontWeight: "300",
              justifyContent: "right",
            }}
          >
            Total Rs {gettotal()}
          </h2>
        ) : (
          <p>Login To Place Order</p>
        )}
      </Modal.Body>

      {cartstate.mycart.length > 0 && authstate.isAuthenticated ? (
        <Form style={{ width: "80%", margin: "10px auto " }}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Delivery address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              onChange={(e) => handlechange(e)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contact No.</Form.Label>
            <Form.Control
              type="tel"
              placeholder="123-456-7890"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              onChange={(e) => handlechange(e)}
            />
          </Form.Group>
        </Form>
      ) : null}

      {/* <StripeCheckout
        name="CR@ZY_WorLd"
        token={makePayment} // the pop-in header title
        description="India's Own Brand" // the pop-in header subtitle
        // image={require("../../assets/slide2.jpg")} // the pop-in header image (default none)
        ComponentClass="div"
        panelLabel="" // prepended to the amount in the bottom pay button
        amount={gettotal() * 100} // cents
        currency="INR"
        stripeKey="pk_test_51H5lwnLfTnKAxHewObuWO4kKwOAWraodoejsJoFtmbH8b9inTnRDcVxPR8Ua7cO0RvzUv1gtGS8KKYQ6DK1OkFE900nyF5aoDn"
        email="info@crazyworld.in"
        // Note: Enabling either address option will give the user the ability to
        // fill out both. Addresses are sent as a second parameter in the token callback.
        // shippingAddress
        //billingAddress={false}
        // Note: enabling both zipCode checks and billing or shipping address will
        // cause zipCheck to be pulled from billing address (set to shipping if none provided).
        //zipCode={false}
        style={{ width: "90%", margin: "10px auto " }}
      > */}
      {cartstate.mycart.length > 0 ? (
        <Button
          className="btn btn-primary mb-4 my-4"
          style={{ width: "90%", margin: "10px auto " }}
          onClick={() => handleorders()}
        >
          Order Now
        </Button>
      ) : null}
      {/* </StripeCheckout> */}
    </Modal>
  );
};

export default Cart;
