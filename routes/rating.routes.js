// rating.js
const express = require('express');
const router = express.Router();
const { HistoricalEvent, Comment, Rating } = require('../models/HistoricalEvent.model');
const isLoggedIn = require('../middleware/isLoggedIn');

// Ruta para agregar valoraciones a un evento
router.post('/:id/rating', isLoggedIn, (req, res) => {
    const eventId = req.params.id;
    const { userId, value } = req.body;
    
  

    HistoricalEvent.findById(eventId)
        .then((event) => {
            if (!event) {
                return res.status(404).json({ error: 'Event not found' });
            }

            // Verifica si se proporcionó un valor válido (entre 1 y 5)
            if (!isValidRating(value)) {
                return res.status(400).json({ error: 'Invalid rating value' });
            }

            // Verifica si el usuario ya ha valorado el evento, y actualiza la valoración si es el caso
            const existingRating = event.ratings.find((rating) => rating.user.toString() === userId);
            if (existingRating) {
                existingRating.value = value;
            } else {
                // Agrega una nueva valoración al evento
                event.ratings.push({ user: userId, value });
            }

            // Guarda el evento actualizado en la base de datos y devuelve una promesa para encadenar
            return event.save();
        })
        .then((updatedEvent) => {
            res.status(200).json({ message: 'Rating added successfully', updatedEvent });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

// Función para verificar si el valor de la valoración es válido (entre 1 y 5)
function isValidRating(value) {
    const numericValue = parseFloat(value);
    return !isNaN(numericValue) && numericValue >= 1 && numericValue <= 5;
}

module.exports = router;
