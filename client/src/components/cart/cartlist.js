import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
// import aatmanirbhar from "../../assets/aatmanirbhar.jpg";
// import Cart from "./cart";
import { ProductContext } from "../../context/productprovider";

const Cartlist = ({ cart, removefromcart, user, guest, userauth }) => {
  const { productstate } = useContext(ProductContext);
  // console.log(productstate);
  const productarray = productstate.allproducts;

  return (
    <Table striped bordered hover size="sm">
      <Thead />

      {userauth
        ? cart.map((item, i) => {
            // console.log(item);
            return (
              <Tbody
                key={i}
                item={item}
                product={productarray}
                removefromcart={removefromcart}
                user={user}
              />
            );
          })
        : guest.map((item, i) => {
            // console.log(item);
            return (
              <Tbodyy
                key={i}
                item={item}
                product={productarray}
                removefromcart={removefromcart}
                user={user}
              />
            );
          })}
    </Table>
  );
};

const Thead = () => {
  return (
    <thead>
      <tr>
        <th>Product</th>
        <th>Name</th>
        <th>Price</th>
        <th>No</th>
        <th>Remove</th>
      </tr>
    </thead>
  );
};

const Tbody = ({ item, product, removefromcart, user }) => {
  const tshirtstyle = {
    height: "70px",
    width: "70px",
  };

  const getimage = (id) => {
    var { image } = product.find((i) => i._id === id);
    return image;
  };

  const gettitle = (id) => {
    // console.log(product);
    var { title } = product.find((i) => i._id === id);
    // console.log(title);
    return title;
  };

  const handleremove = (itemid) => {
    removefromcart({ itemid, email: user.email });
  };

  return (
    <tbody>
      <tr style={{ textAlign: "center", fontSize: "16px" }}>
        <td style={{ textAlign: "center" }}>
          <img
            src={require(`../../assets/${getimage(item.productid)}`)}
            alt="Aatmanirbhar Tshirt"
            style={tshirtstyle}
          />
        </td>
        <td style={{ paddingTop: "30px" }}>{gettitle(item.productid)}</td>
        <td style={{ paddingTop: "30px" }}>Rs {item.productprice}</td>
        <td style={{ paddingTop: "30px" }}>{item.quantity}</td>
        <td style={{ paddingTop: "20px" }}>
          <Button
            variant=""
            style={{ width: "", margin: " auto" }}
            onClick={() => handleremove(item._id)}
          >
            <i
              className="fas fa-times-circle"
              style={{ fontSize: "30px", color: "red" }}
            ></i>
          </Button>
        </td>
      </tr>
    </tbody>
  );
};

const Tbodyy = ({ item, product }) => {
  const tshirtstyle = {
    height: "70px",
    width: "70px",
  };

  const getimage = (id) => {
    var { image } = product.find((i) => i._id === id);
    return image;
  };

  const gettitle = (id) => {
    // console.log(product);
    var { title } = product.find((i) => i._id === id);
    // console.log(title);
    return title;
  };

  // const handleremove = (itemid) => {
  //   removefromcart({ itemid, email: user.email });
  // };

  return (
    <tbody>
      <tr style={{ textAlign: "center", fontSize: "16px" }}>
        <td style={{ textAlign: "center" }}>
          <img
            src={require(`../../assets/${getimage(item.productid)}`)}
            alt="Aatmanirbhar Tshirt"
            style={tshirtstyle}
          />
        </td>
        <td style={{ paddingTop: "30px" }}>{gettitle(item.productid)}</td>
        <td style={{ paddingTop: "30px" }}>Rs {item.productprice}</td>
        <td style={{ paddingTop: "30px" }}>{item.quantity}</td>
        <td style={{ paddingTop: "20px" }}>
          <Button variant="" style={{ width: "", margin: " auto" }}>
            <i
              className="fas fa-times-circle"
              style={{ fontSize: "30px", color: "red" }}
            ></i>
          </Button>
        </td>
      </tr>
    </tbody>
  );
};

export default Cartlist;
