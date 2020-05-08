const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const csurf = require("csurf");
const passport = require("passport");
const { auth, nonAuth } = require("../middlewares/auth");

router.use(csurf());

router.get("/signup", nonAuth, async function (req, res, next) {
  var messages = req.flash("error");
  res.render("user/signup", { csrfToken: req.csrfToken(), messages: messages });
});

router.post(
  "/signup",
  nonAuth,
  passport.authenticate("local.signup", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signup",
    failureFlash: true,
  })
);

router.get("/signin", nonAuth, function (req, res, next) {
  let messages = req.flash("error");
  res.render("user/signin", { csrfToken: req.csrfToken(), messages: messages });
});

router.post(
  "/signin",
  nonAuth,
  passport.authenticate("local.signin", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signin",
    failureFlash: true,
  })
);

router.get("/logout", function (req, res, next) {
  req.logout();
  res.redirect("/");
});

router.get("/profile", auth, function (req, res) {
  res.render("user/profile");
});

// function isLoggedIn(req, res, next) {
//   if (!req.isAuthenticated()) {
//     next();
//   }
//   res.redirect("/");
// }

module.exports = router;
