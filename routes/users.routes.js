const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const isLoggedIn = require("../middleware/isLoggedIn");
const fileUploader = require('../config/cloudinary.config');
const User = require("../models/User.model");


// RUTA DE PERFIL

router.get("/profile", isLoggedIn, (req, res) => {
    const user = req.session.user; 
    // console.log("User data from session:", user);
    res.render("users/user-profile", { user });
})

// RUTA DE EDITAR PERFIL

router.get("/editprofile", isLoggedIn, (req, res) => {
    res.render("users/edituser-profile", { user: req.session.user });
})

router.post('/editprofile', isLoggedIn, fileUploader.single('profileImage'), (req, res, next) => {
    const { username, password } = req.body;
    const profileImage = req.file ? req.file.path : req.session.user.profileImage;

    // Actualiza la información del usuario en la base de datos
    User.findById(req.session.user._id)
        .then(user => {
            // Actualiza la información del usuario en la base de datos
            user.username = username;
            user.profileImage = profileImage;

            // Actualiza la contraseña solo si se proporciona una nueva contraseña
            if (password) {
                return bcrypt.hash(password, 10)
                    .then(hashedPassword => {
                        user.password = hashedPassword;
                        return user.save();
                    });
            }

            return user.save();
        })
        .then(updatedUser => {
            // Actualiza la información del usuario en la sesión
            req.session.user = updatedUser.toObject();
            delete req.session.user.password;

            // Redirige a la página de perfil después de la actualización
            res.redirect('/users/profile');
        })
        .catch(error => {
            console.error('Error when editing profile:', error);
            next(error);
        });
});

module.exports = router;