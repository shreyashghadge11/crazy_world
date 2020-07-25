import React, { useContext, useEffect } from "react";
import Product from "./product";
import { ProductContext } from "../../context/productprovider";
import { CartContext } from "../../context/cartprovider";

const Productlist = (props) => {
  const { getallproducts, productstate } = useContext(ProductContext);
  const { addproducttocart, guestproducttocart } = useContext(CartContext);

  useEffect(getallproducts, []);
  // console.log(productstate);
  return (
    <div
      className=""
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "90%",
        margin: "40px auto",
        justifyContent: "space-evenly",
        backgroundColor: "#dcdde1",
      }}
    >
      {productstate.allproducts &&
        productstate.allproducts.map((item) => {
          return (
            <Product
              key={item._id}
              item={item}
              addproducttocart={addproducttocart}
              guestproducttocart={guestproducttocart}
              userid={props.userid}
            />
          );
        })}
      {/* <Product/> */}
    </div>
  );
};

export default Productlist;
