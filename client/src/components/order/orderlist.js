import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
// import aatmanirbhar from "../../assets/aatmanirbhar.jpg";
import { ProductContext } from "../../context/productprovider";

const Orderlist = ({ orders, user }) => {
  // const arr = [1, 1, 1, 1];
  const { productstate } = useContext(ProductContext);
  // console.log(productstate);
  const productarray = productstate.allproducts;

  return (
    <Table striped bordered hover size="sm">
      <Thead />
      {orders.map((item, i) => {
        return (
          <Tbody
            key={i}
            item={item}
            product={productarray}
            // removefromcart={removefromcart}
            user={user}
          />
        );
      })}
    </Table>
  );
};

const Thead = () => {
  return (
    <thead style={{ width: "90%" }}>
      <tr>
        <th>Product</th>
        <th>Name</th>
        <th>Status</th>

        <th>No</th>
        <th>Cancel</th>
      </tr>
    </thead>
  );
};

const Tbody = ({ item, product, user }) => {
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
        <td style={{ paddingTop: "30px" }}>Delivered</td>
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

export default Orderlist;
