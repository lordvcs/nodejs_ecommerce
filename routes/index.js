const express = require("express");
const router = express.Router();
const Product = require("../models/product");

/* GET home page. */
router.get("/", async function (req, res, next) {
  let products = await Product.find();
  res.render("shop", { title: "Expreseees", products: products });
});

module.exports = router;
