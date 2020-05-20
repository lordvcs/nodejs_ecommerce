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

router.get("/checkout", async function (req, res) {
  if (!req.session.cart) {
    res.redirect("/shopping-cart");
  }
  let cart = new Cart(req.session.cart);
  // Set your secret key. Remember to switch to your live secret key in production!
  // See your keys here: https://dashboard.stripe.com/account/apikeys
  const stripe = require("stripe")(process.env.STRIPE_API_KEY);
  console.log("amount", cart.totalPrice * 10);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: cart.totalPrice * 10,
    currency: "inr",
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" },
  });
  res.render("shop/checkout", { clientSecret: paymentIntent.client_secret });
});

module.exports = router;
