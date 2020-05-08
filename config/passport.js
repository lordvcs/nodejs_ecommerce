const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const { body, validationResult } = require("express-validator");

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async function (req, email, password, done) {
      await body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email should be valid email")
        .run(req);
      await body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 4 })
        .withMessage("Password should atleast be of length 4")
        .run(req);
      const result = validationResult(req);
      if (!result.isEmpty()) {
        // return res.status(422).json({ errors: result.array() });
        let errors = result.array();
        let messages = [];
        errors.forEach(function (error) {
          messages.push(error.msg);
        });
        console.log("messages", messages);

        return done(null, false, req.flash("error", messages));
      }
      User.findOne(
        {
          email: email,
        },
        function (err, user) {
          if (err) return done(err);
          if (user) {
            return done(null, false, { message: "Email is already in use." });
          }
          let newUser = new User();
          newUser.email = email;
          newUser.password = User.encryptPassword(password);
          newUser.save(function (err, result) {
            if (err) return done(err);
            return done(null, newUser);
          });
        }
      );
    }
  )
);

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async function (req, email, password, done) {
      await body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email should be valid email")
        .run(req);
      await body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 4 })
        .withMessage("Password should atleast be of length 4")
        .run(req);
      const result = validationResult(req);
      if (!result.isEmpty()) {
        // return res.status(422).json({ errors: result.array() });
        let errors = result.array();
        let messages = [];
        errors.forEach(function (error) {
          messages.push(error.msg);
        });
        console.log("messages", messages);

        return done(null, false, req.flash("error", messages));
      }
      User.findOne(
        {
          email: email,
        },
        function (err, user) {
          if (err) return done(err);
          if (!user)
            return done(null, false, {
              message: "User with that email doenst exist.",
            });
          if (!user.validPassword(password))
            return done(null, false, { message: "Password is incorrect. " });
          return done(null, user);
        }
      );
    }
  )
);
