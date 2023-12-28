// rating.js
const express = require('express');
const router = express.Router();
const { HistoricalEvent } = require('../models/HistoricalEvent.model');
const isLoggedIn = require('../middleware/isLoggedIn');

// Ruta para agregar valoraciones a un evento
router.post('/:id/rating', isLoggedIn, async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.user._id; // Obtén el ID del usuario de la sesión

        // Verifica si se proporcionó un valor válido (entre 1 y 5)
        const value = req.body.value;
        if (!isValidRating(value)) {
            return res.status(400).json({ error: 'Invalid rating value' });
        }

        const event = await HistoricalEvent.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Verifica si el usuario ya ha valorado el evento
        const existingRatingIndex = event.ratings.findIndex((rating) => rating.user.toString() === userId.toString());

        if (existingRatingIndex !== -1) {
            // Actualiza la valoración existente
            event.ratings[existingRatingIndex].value = value;
        } else {
            // Agrega una nueva valoración al evento
            event.ratings.push({ user: userId, value });
        }

        // Guarda el evento actualizado en la base de datos y devuelve una respuesta
        await event.save();
        res.status(200).json({ message: 'Rating added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Función para verificar si el valor de la valoración es válido (entre 1 y 5)
function isValidRating(value) {
    const numericValue = parseFloat(value);
    return !isNaN(numericValue) && numericValue >= 1 && numericValue <= 5;
}

module.exports = router;

