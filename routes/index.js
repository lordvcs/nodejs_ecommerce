const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const csurf = require("csurf");
const passport = require("passport");

router.use(csurf());

/* GET home page. */
router.get("/", async function (req, res, next) {
  let products = await Product.find();
  res.render("shop", { title: "Expreseees", products: products });
});

router.get("/user/signup", async function (req, res, next) {
  var messages = req.flash("error");
  res.render("user/signup", { csrfToken: req.csrfToken(), messages: messages });
});

router.post(
  "/user/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signup",
    failureFlash: true,
  })
);

router.get("/user/signin", async function (req, res, next) {
  let messages = req.flash("error");
  res.render("user/signin", { csrfToken: req.csrfToken(), messages: messages });
});

router.post(
  "/user/signin",
  passport.authenticate("local.signin", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signin",
    failureFlash: true,
  })
);

router.get("/user/profile", function (req, res) {
  res.render("user/profile");
});

module.exports = router;
