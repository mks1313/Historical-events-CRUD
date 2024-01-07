const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const isLoggedIn = require("../middleware/isLoggedIn");
const fileUploader = require('../config/cloudinary.config');
const User = require("../models/User.model");
const { HistoricalEvent, Comment, Rating }  = require("../models/HistoricalEvent.model");



// RUTA DE PERFIL

router.get("/profile", isLoggedIn, (req, res) => {
    const user = req.session.user; 
    // console.log('User from session:', user);
    HistoricalEvent.countDocuments({ creator: user })
        .then(eventCount => {
            return User.findById(user)
                .then(userData => {
                    // console.log(userData);
                    // Renderiza la página del perfil con la cantidad de eventos creados
                    res.render("users/user-profile", { user: userData, eventCount });
                });
        })
        .catch(error => {
            console.error('Error al obtener datos del perfil:', error);
            res.status(500).send('Error interno del servidor');
        });
});
    
// RUTA DE EDITAR PERFIL
router.get("/editprofile", isLoggedIn, (req, res, next) => {
    
    res.render("users/edituser-profile", { user: req.session.user });
});


router.post('/editprofile', isLoggedIn, fileUploader.single('profileImage'), (req, res, next) => {
    const { username, password } = req.body; 
    const profileImage = req.file ? req.file.path : req.session.user.profileImage;
    // console.log('req.body:', req.body);
    // console.log('req.file:', req.file);

    
    User.findById(req.session.user._id)
        .then(user => {
   
            user.username = username; 
            user.profileImage = profileImage;

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
            req.session.user = { ...updatedUser.toObject(), password: undefined };

            res.redirect('/users/profile');
        })
        .catch(error => {
            console.error('Error when editing profile:', error);
            next(error);
        });
});

module.exports = router;
