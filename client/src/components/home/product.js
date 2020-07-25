import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { AuthContext } from "../../context/authprovider";

const Product = ({ item, addproducttocart, guestproducttocart, userid }) => {
  const { authstate } = React.useContext(AuthContext);
  const [num, setNum] = useState({
    aatmanirbhar: 1,
    apnatimeaayega: 1,
    howsthejosh: 1,
    tea: 1,
    pizzasock: 1,
    dogsock: 1,
    joggers1: 1,
    joggers2: 1,
  });

  const handlechange = (image, e) => {
    if (image === "aatmanirbhar.jpg") {
      setNum({ ...num, aatmanirbhar: Number(e.target.value) });
    }
    if (image === "apnatimeaayega.jpg") {
      setNum({ ...num, apnatimeaayega: Number(e.target.value) });
    }
    if (image === "tea.jpg") {
      setNum({ ...num, tea: Number(e.target.value) });
    }
    if (image === "howsthejosh.jpg") {
      setNum({ ...num, howsthejosh: Number(e.target.value) });
    }
    if (image === "pizzasock.jpg") {
      setNum({ ...num, pizzasock: Number(e.target.value) });
    }
    if (image === "dogsock.jpg") {
      setNum({ ...num, dogsock: Number(e.target.value) });
    }
    if (image === "joggers2.jpg") {
      setNum({ ...num, joggers2: Number(e.target.value) });
    }
    if (image === "joggers1.webp") {
      setNum({ ...num, joggers1: Number(e.target.value) });
    }
    // console.log(num);
  };

  const handleimage = (image) => {
    if (image === "aatmanirbhar.jpg") {
      return num.aatmanirbhar;
    }
    if (image === "apnatimeaayega.jpg") {
      return num.apnatimeaayega;
    }
    if (image === "tea.jpg") {
      return num.tea;
    }
    if (image === "howsthejosh.jpg") {
      return num.howsthejosh;
    }
    if (image === "pizzasock.jpg") {
      return num.pizzasock;
    }
    if (image === "dogsock.jpg") {
      return num.dogsock;
    }
    if (image === "joggers2.jpg") {
      return num.joggers2;
    }
    if (image === "joggers1.webp") {
      return num.joggers1;
    }
  };

  const addtocart = (product) => {
    var quantity = handleimage(product.image);
    addproducttocart({
      itemid: product._id,
      email: authstate.user.email,
      quantity,
    });
  };

  const addtoguestcart = (item) => {
    // console.log(userid);
    var quantity = handleimage(item.image);
    guestproducttocart({
      itemid: item._id,
      userid: userid,
      quantity,
    });
  };

  return (
    <Card
      style={{
        width: "20rem",
        margin: "30px 30px",
        boxShadow: "10px 10px 10px rgba(0,0,0,0.7)",
        textAlign: "center",
      }}
    >
      <Card.Img
        variant="top"
        src={require(`../../assets/${item.image}`)}
        style={{
          height: "300px",
          width: "15rem",
          margin: "30px auto 10px auto",
          boxShadow: "8px 8px 10px rgba(0,0,0,0.7)",
        }}
      />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>Price {item.price} Rs</Card.Text>
        <Form.Group
          controlId="exampleForm.ControlSelect1"
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "80%",
            margin: "0px auto 12px auto",
          }}
        >
          <Form.Label style={{ paddingTop: "3px" }}>Quantity</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => {
              handlechange(item.image, e);
            }}
            style={{ width: "30%" }}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>

        {authstate.isAuthenticated ? (
          <Button
            variant="dark"
            style={{ boxShadow: "5px 5px 5px rgba(0,0,0,0.7)" }}
            onClick={() => addtocart(item)}
          >
            Add To Cart
          </Button>
        ) : null}
        {!authstate.isAuthenticated ? (
          <Button
            variant="dark"
            style={{ boxShadow: "5px 5px 5px rgba(0,0,0,0.7)" }}
            onClick={() => addtoguestcart(item)}
          >
            Add To Cart
          </Button>
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default Product;
