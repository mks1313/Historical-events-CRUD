const express = require("express");
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");


// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

// GET /auth/signup
router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

// POST /auth/signup
router.post("/signup", isLoggedOut, (req, res) => {
  const { username, email, password, profileImage } = req.body;
  
  // Check that username, email, and password are provided
  if (username === "" || email === "" || password === "") {
    res.status(400).render("auth/signup", {
      errorMessage:
      "All fields are mandatory. Please provide your username, email and password.",
    });
    
    return;
  }
  
  if (password.length < 6) {
    res.status(400).render("auth/signup", {
      errorMessage: "Your password needs to be at least 6 characters long.",
    });
    
    return;
  }
  
  //   ! This regular expression checks password for special characters and minimum length
  
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res
    .status(400)
    .render("auth/signup", {
      errorMessage: "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter."
    });
    return;
  }
  
 
 
 bcrypt
 .genSalt(saltRounds)
 .then((salt) => bcrypt.hash(password, salt))
 .then((hashedPassword) => {
  
   return User.create({ username, email, profileImage, password: hashedPassword });
  })
  .then((user) => {
    res.redirect("/auth/login");
  })
  .catch((error) => {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(500).render("auth/signup", { errorMessage: error.message });
    } else if (error.code === 11000) {
      res.status(500).render("auth/signup", {
        errorMessage:
        "Username and email need to be unique. Provide a valid username or email.",
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
  const {email, password } = req.body;

  // Check that username, email, and password are provided
  if (email === "" || password === "") {
    res.status(400).render("auth/login", {
      errorMessage:
        "All fields are mandatory. Please provide username, email and password.",
    });

    return;
  }


  if (password.length < 6) {
    return res.status(400).render("auth/login", {
      errorMessage: "Your password needs to be at least 6 characters long.",
    });
  }

  User.findOne({ email })
    .then((user) => {
   
      if (!user) {
        res
          .status(400)
          .render("auth/login", { errorMessage: "Wrong credentials." });
        return;
      }

      
      bcrypt
        .compare(password, user.password)
        .then((isSamePassword) => {
          if (!isSamePassword) {
            res
              .status(400)
              .render("auth/login", { errorMessage: "Wrong credentials." });
            return;
          }
          req.session.user = {
            _id: user._id,
            username: user.username,
           
          };
          
          req.session.user = user.toObject();
          
          delete req.session.user.password;
         
          res.redirect("/users/profile");
        })
        .catch((err) => next(err)); 
    })
    .catch((err) => next(err));
});

//  /auth/logout
router.post("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).render("auth/logout", { errorMessage: err.message });
      return;
    }

    res.redirect("/");
  });
});

module.exports = router;
