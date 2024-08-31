const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const isLoggedIn = require("../middleware/isLoggedIn");
const fileUploader = require("../config/cloudinary.config");
const User = require("../models/User.model");
const {
  HistoricalEvent,
  Comment,
  Rating,
} = require("../models/HistoricalEvent.model");

// RUTA DE PERFIL
// TODO manejo de errores(mensajes de error) para archivos grandes(manejo multer)

router.get("/profile", isLoggedIn, (req, res) => {
  const user = req.session.user;

  HistoricalEvent.countDocuments({ creator: user })
    .then((eventCount) => {
      return User.findById(user).then((userData) => {
        res.render("users/user-profile", { user: userData, eventCount });
      });
    })
    .catch((error) => {
      next(error);
    });
});

// RUTA DE EDITAR PERFIL
router.get("/editprofile", isLoggedIn, (req, res, next) => {
  res.render("users/edituser-profile", { user: req.session.user });
});

router.post(
  "/editprofile",
  isLoggedIn,
  fileUploader.single("profileImage"),
  (req, res, next) => {
    const { username, password } = req.body;
    const profileImage = req.file
      ? req.file.path
      : req.session.user.profileImage;

    User.findById(req.session.user._id)
      .then((user) => {
        user.username = username;
        user.profileImage = profileImage;

        if (password) {
          return bcrypt.hash(password, 10).then((hashedPassword) => {
            user.password = hashedPassword;
            return user.save();
          });
        }

        return user.save();
      })
      .then((updatedUser) => {
        req.session.user = { ...updatedUser.toObject(), password: undefined };

        res.redirect("/users/profile");
      })
      .catch((error) => {
        next(error);
      });
  }
);

module.exports = router;
