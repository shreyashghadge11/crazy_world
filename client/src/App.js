import React from "react";
import NavBar from "./components/home/navbar";
import SlidesHead from "./components/home/slides";
import Productlist from "./components/home/productslist";
import User from "./components/user/user";
import Cart from "./components/cart/cart";
import Orders from "./components/order/orders";
import Trackorder from "./components/order/trackorder";
import { AuthProvider } from "./context/authprovider";
import { ProductProvider } from "./context/productprovider";
import { CartProvider } from "./context/cartprovider";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [modalShow, setModalShow] = React.useState(false);
  const [cartShow, setCartShow] = React.useState(false);
  const [ordersShow, setOrdersShow] = React.useState(false);
  const [trackShow, setTrackShow] = React.useState(false);
  const [cookies, setCookie] = useCookies(["userid"]);

  React.useEffect(() => {
    if (!cookies.userid) {
      setCookie("userid", uuidv4(), { path: "/" });
    }
  });

  return (
    <div className="App">
      <ProductProvider>
        <AuthProvider>
          <CartProvider>
            <NavBar
              modalShow={modalShow}
              setModalShow={setModalShow}
              cartShow={cartShow}
              setCartShow={setCartShow}
              ordersShow={ordersShow}
              setOrdersShow={setOrdersShow}
              trackShow={trackShow}
              setTrackShow={setTrackShow}
              userid={cookies.userid}
            />
            <User show={modalShow} onHide={() => setModalShow(false)} />
            <Cart show={cartShow} onHide={() => setCartShow(false)} />
            <Orders show={ordersShow} onHide={() => setOrdersShow(false)} />
            <Trackorder show={trackShow} onHide={() => setTrackShow(false)} />
            <SlidesHead />
            <Productlist userid={cookies.userid} />
          </CartProvider>
        </AuthProvider>
      </ProductProvider>
    </div>
  );
}

export default App;
