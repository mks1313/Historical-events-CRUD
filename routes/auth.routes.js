const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

const saltRounds = 10;

const validatePassword = (password) => {
  const hasNumber = /[0-9]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  return password.length >= 6 && hasNumber && hasLowercase && hasUppercase;
};

// GET /auth/signup
router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

// POST /auth/signup
router.post("/signup", isLoggedOut, (req, res, next) => {
  const { username, email, password, profileImage } = req.body;

  // Check empty fields
  if (!username || !email || !password) {
    return res.status(400).render("auth/signup", {
      errorMessage: "All fields are mandatory. Please provide your username, email, and password.",
    });
  }

  // Validation 
  if (!validatePassword(password)) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Password must have at least 6 characters and include at least one number, one lowercase and one uppercase letter.",
    });
  }

  // Hash of the password
  bcrypt
    .genSalt(saltRounds)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        username,
        email,
        profileImage,
        password: hashedPassword,
      });
    })
    .then(() => {
      res.redirect("/auth/login");
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/signup", { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render("auth/signup", {
          errorMessage: "Username and email need to be unique. Provide a valid username or email.",
        });
      } else {
        next(error); 
      }
    });
});

// GET /auth/login
router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});

// POST /auth/login
router.post("/login", isLoggedOut, (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).render("auth/login", {
      errorMessage: "All fields are mandatory. Please provide email and password.",
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).render("auth/login", { errorMessage: "Wrong credentials." });
      }

      return bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(400).render("auth/login", { errorMessage: "Wrong credentials." });
        }

        req.session.user = user.toObject();
        delete req.session.user.password; 
        res.redirect("/users/profile");
      });
    })
    .catch((err) => next(err));
});

// POST /auth/logout
router.post("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).render("auth/logout", { errorMessage: err.message });
    }
    res.redirect("/");
  });
});

module.exports = router;

