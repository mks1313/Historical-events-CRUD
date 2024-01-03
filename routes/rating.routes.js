// rating.js
const express = require('express');
const router = express.Router();
const { HistoricalEvent, Comment, Rating }  = require("../models/HistoricalEvent.model");
const User = require("../models/User.model");
const isLoggedIn = require('../middleware/isLoggedIn');
const mongoose = require('mongoose');

// Ruta para agregar valoraciones a un evento
router.post('/:id/rating', isLoggedIn, (req, res) => {
    const eventId = req.params.id;
    const userId = req.session.user._id;
    const value = req.body.value;

    function isValidRating(value) {
        const numericValue = parseFloat(value);
        return !isNaN(numericValue) && numericValue >= 1 && numericValue <= 5;
    }

    if (!isValidRating(value)) {
        return res.status(400).json({ error: 'Invalid rating value' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid userId' });
    }

    HistoricalEvent.findById(eventId)
        .then((event) => {
            if (!event) {
                return res.status(404).json({ error: 'Event not found' });
            }

            const existingRatingIndex = event.ratings.findIndex((rating) => rating.user.toString() === userId.toString());

            if (existingRatingIndex !== -1) {
                event.ratings[existingRatingIndex].value = value;
            } else {
                event.ratings.push({ user: userId, value });
            }
            return event.save();
        })
        .then(() => {
            // Devuelve una respuesta
            req.flash('successMessage', 'Interaction added successfully');
            const rutaRedireccion = `/events/${eventId}`;
            res.redirect(rutaRedireccion);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

module.exports = router;

