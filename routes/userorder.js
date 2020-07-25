const express = require("express");
const Products = require("../models/products");
const User = require("../models/user");
const Order = require("../models/order");
const Guest = require("../models/guest");
// const order = require('../models/order');
const router = express.Router();

router.post("/cart", (req, res) => {
  const itemid = req.body.itemid;
  const useremail = req.body.email;
  const quantity = req.body.quantity;

  Products.findById(itemid)
    .then((product) => {
      let productdetails = {
        productid: product._id,
        quantity: quantity,
        productprice: product.price,
      };

      User.findOne({ email: useremail })
        .then((user) => {
          user.cart.push(productdetails);
          user
            .save()
            .then((result) => {
              return res.status(200).json(productdetails);
            })
            .catch((err) => {
              return res.status(404).json({ error: "Something went wrong !" });
            });
        })
        .catch((err) => {
          return res.status(404).json({ error: "Something went wrong !" });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "Something went wrong !" });
    });
});

router.post("/cartremove", (req, res) => {
  const itemid = req.body.itemid;
  const useremail = req.body.email;

  //const quantity = req.body.quantity;

  User.findOneAndUpdate(
    { email: useremail },
    { $pull: { cart: { _id: itemid } } }
  )
    .then((user) => {
      // console.log("its happening here");
      return res.status(200).json(user.cart);
    })
    .catch((err) => {
      return res.status(404).json({ error: "Something went wrong !" });
    });
});

router.post("/mycart/get", (req, res) => {
  const email = req.body.email;
  const userid = req.body.userid;
  //const quantity = req.body.quantity;
  let arr = [];
  // console.log(email, userid);
  Guest.findOne({ userid })
    .then((result) => {
      arr = [...result.cart];
      Guest.updateOne({ userid }, { $set: { cart: [] } })
        .then((data1) => {
          User.findOne({ email })
            .then((user) => {
              for (var i = 0; i < arr.length; i++) {
                user.cart.push(arr[i]);
              }
              user
                .save()
                .then((result1) => {
                  return res.status(200).json(result1.cart);
                })
                .catch((err) => {
                  return res
                    .status(404)
                    .json({ error: "Something went wrong !" });
                });
            })
            .catch((err) => {
              return res.status(404).json({ error: "Something went wrong !" });
            });
        })
        .catch((err) => {
          return res.status(404).json({ error: "Something went wrong !" });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "Something went wrong !" });
    });
});

router.post("/placeorder", (req, res) => {
  const email = req.body.email;
  const address = req.body.address;
  const mobileno = req.body.mobileno;
  let arr = [];
  let orderobject = [];
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  User.findOne({ email })
    .then((result) => {
      arr = result.cart;
      for (var i = 0; i < result.cart.length; i++) {
        orderobject.push({
          productid: arr[i].productid,
          quantity: arr[i].quantity,
          orderDate: today,
        });
        result.ordered.push(arr[i]);
      }
      result
        .save()
        .then((orders) => {
          const neworder = new Order({
            email,
            address,
            mobileno,
            orderStatus: orderobject,
            delivery: false,
          });
          neworder
            .save()
            .then((response) => {
              User.updateOne({ email }, { $set: { cart: [] } })
                .then((doc) => {
                  return res.status(200).json(response);
                })
                .catch((err) => {
                  return res
                    .status(404)
                    .json({ error: "Something went wrong !" });
                });
            })
            .catch((err) => {
              return res.status(404).json({ error: "Something went wrong !" });
            });
        })
        .catch((err) => {
          return res.status(404).json({ error: "Something went wrong !" });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "Something went wrong !" });
    });
});

router.get("/myorder/:email", (req, res) => {
  const email = req.params.email;
  //const quantity = req.body.quantity;

  User.findOne({ email })
    .then((data) => {
      return res.status(200).json(data.ordered);
    })
    .catch((err) => {
      return res.status(404).json({ error: "Something went wrong !" });
    });
});

module.exports = router;

// function (err, data) {
//   if (err) {
//     return res
//       .status(500)
//       .json({ error: "Error in Removing item from cart !" });
//   }
//   console.log(data);
//   res.json(data);
// }

//       {

//         .catch((err) => {
//           return res.status(404).json({ error: "Something went wrong !" });
//         });
//     })
//     .catch((err) => console.log(err));
// })
// .catch((err) => console.log(err));
