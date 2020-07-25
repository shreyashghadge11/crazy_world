const express = require("express");
const Products = require("../models/products");
const router = express.Router();

router.post("/add", (req, res) => {
  const { title, price, image, description, category } = req.body;

  const newProduct = new Products({
    title,
    price,
    image,
    category,
    description,
  });

  newProduct
    .save()
    .then((result) => {
      return res.status(200).json({ product: "Product added successfully :)" });
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ error: "Product no added. Please Try Again! " });
    });
});

router.get("/all", (req, res) => {
  Products.find()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ error: "Something went wrong. Please try again!" });
    });
});

router.get("/product/:id", (req, res) => {
  const id = req.params.id;

  Products.findById(id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ error: "Something went wrong. Please try again!" });
    });
});

router.get("/category/:item", (req, res) => {
  const category = req.params.item;

  Products.find({ category })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ error: "Something went wrong. Please try again!" });
    });
});

module.exports = router;
