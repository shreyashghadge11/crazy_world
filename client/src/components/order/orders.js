import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import Orderlist from "./orderlist";
import { CartContext } from "../../context/cartprovider";
import { AuthContext } from "../../context/authprovider";

const Orders = (props) => {
  // const [cart,setCart] = React.useState(true);
  const { cartstate } = useContext(CartContext);
  const { authstate } = useContext(AuthContext);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{}}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">My Orders</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Orderlist
          orders={cartstate.myorders}
          // removefromcart={removefromcart}
          user={authstate.user}
        />
      </Modal.Body>
      {/* <Button variant="success" style={{width:"90%",margin:"10px auto"}}>Order Now</Button> */}
    </Modal>
  );
};

export default Orders;
