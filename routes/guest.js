const express = require("express");
const Products = require("../models/products");
const User = require("../models/user");
const Order = require("../models/order");
const Guest = require("../models/guest");
const router = express.Router();

// router.post("/create", (req, res) => {
//   const userid = req.body.userid;

//   Guest.find({ userid })
//     .then((user) => {
//       if (!user) {
//         const newguest = new Guest({ userid: userid });
//         newguest.save((guest) => {
//           //   console.log(guest);
//         });
//       }
//     })
//     .catch((err) => console.log(err));
// });

router.post("/cart", (req, res) => {
  const itemid = req.body.itemid;
  const userid = req.body.userid;
  const quantity = req.body.quantity;

  Products.findById(itemid)
    .then((product) => {
      let productdetails = {
        productid: product._id,
        quantity: quantity,
        productprice: product.price,
      };

      Guest.findOne({ userid })
        .then((user) => {
          //   console.log(user);
          if (!user) {
            var newguest = new Guest({ userid: userid });
            newguest.save().then((result) => {
              result.cart.push(productdetails);
              result
                .save()
                .then((result) => {
                  return res.status(200).json(productdetails);
                })
                .catch((err) => {
                  return res
                    .status(404)
                    .json({ error: "Something went wrong !" });
                });
            });
          }
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

router.get("/guest/:userid", (req, res) => {
  const userid = req.params.userid;
  //const quantity = req.body.quantity;

  Guest.findOne({ userid })
    .then((data) => {
      // console.log(data);
      return res.status(200).json(data.cart);
    })
    .catch((err) => {
      return res.status(404).json({ error: "Something went wrong !" });
    });
});

module.exports = router;
