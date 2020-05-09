const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Cart = require("../models/cart");

/* GET home page. */
router.get("/", async function (req, res, next) {
  let products = await Product.find();
  res.render("shop", { title: "Expreseees", products: products });
});

router.get("/add-to-cart/:id", function (req, res) {
  let productId = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId, function (err, product) {
    if (err) res.redirect("/");
    cart.add(product, productId);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect("/");
  });
});

router.get("/shopping-cart", function (req, res) {
  res.render("shop/shopping-cart");
});

router.get("/checkout", function (req, res) {
  if (!req.session.cart) {
    res.redirect("/shopping-cart");
  }
  res.render("shop/checkout");
});

module.exports = router;
