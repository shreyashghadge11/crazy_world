import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { AuthContext } from "../../context/authprovider";
import { CartContext } from "../../context/cartprovider";

const Navigation = (props) => {
  const headerstyle = {
    fontSize: "25px",
    fontWeight: "500",
  };

  const icons = {
    fontSize: "20px",
    color: "white",
  };

  const { authstate, logoutUser } = useContext(AuthContext);
  const { getmycart, myorders, getguestcart } = useContext(CartContext);
  const handlecart = (id, email) => {
    // console.log(id);
    getmycart({ email: email, userid: id });
    props.setCartShow(!props.cartShow);
  };
  const handleguestcart = (id) => {
    // console.log(id);
    getguestcart(id);
    props.setCartShow(!props.cartShow);
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      fixed="top"
      style={{
        backgroudColor: "#8c7ae6",
        // boxShadow: "0px 8px 10px rgba(0,0,0,0.8)",
      }}
    >
      <Navbar.Brand href="#home" className="ml-5" style={headerstyle}>
        CRAZY WORLD
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto mr-5">
          {authstate.isAuthenticated ? (
            <Navdropdown
              icons={icons}
              setOrdersShow={props.setOrdersShow}
              setTrackShow={props.setTrackShow}
              myorders={myorders}
              user={authstate.user}
            />
          ) : null}

          {authstate.isAuthenticated ? (
            <Nav.Link
              href="#"
              className="ml-auto mr-5"
              style={icons}
              onClick={() => handlecart(props.userid, authstate.user.email)}
            >
              <i className="fas fa-shopping-cart mr-3"></i>Cart
            </Nav.Link>
          ) : null}

          {authstate.isAuthenticated ? (
            <Nav.Link
              href="#"
              className="ml-auto mr-5"
              style={icons}
              onClick={() => logoutUser()}
            >
              <i className="fas fa-user mr-2"></i>
              LogOut
            </Nav.Link>
          ) : (
            <Nav.Link
              href="#"
              className="ml-auto mr-5"
              style={icons}
              onClick={() => props.setModalShow(!props.modalShow)}
            >
              <i className="fas fa-user mr-2"></i>
              Login
            </Nav.Link>
          )}
          {!authstate.isAuthenticated ? (
            <Nav.Link
              href="#"
              className="ml-auto mr-5"
              style={icons}
              onClick={() => handleguestcart(props.userid)}
            >
              <i className="fas fa-shopping-cart mr-3"></i>Cart
            </Nav.Link>
          ) : null}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;

const Navdropdown = (props) => {
  const handlegetorders = () => {
    props.setOrdersShow(!props.ordersShow);
    props.myorders(props.user.email);
    // console.log()
  };

  return (
    <NavDropdown
      title="Options"
      id="collasible-nav-dropdown"
      className="ml-auto mr-5 danger"
      style={props.icons}
    >
      <NavDropdown.Item href="#" onClick={() => handlegetorders()}>
        Orders
      </NavDropdown.Item>
      <NavDropdown.Item
        href="#"
        onClick={() => props.setTrackShow(!props.trackShow)}
      >
        Track Orders
      </NavDropdown.Item>
      <NavDropdown.Item href="#">Customer Care</NavDropdown.Item>
    </NavDropdown>
  );
};
