const express = require("express");
const router = express.Router();
const HistoricalEvent = require("../models/HistoricalEvent.model");
const helpers = require('../config/helpers');


router.post("/:id/comments", isLoggedIn, (req, res, next) => {
    const eventId = req.params.id;
    const { userId, content } = req.body;

    HistoricalEvent.findById(eventId)
        .then(event => {
            if (!event) {
                return res.status(404).json({ error: "Event not found" });
            }

            // Agregar comentario al evento
            event.comments.push({ author: userId, content });
            return event.save();
        })
        .then(updatedEvent => {
            res.status(201).json({ message: "Comentario agregado correctamente", updatedEvent });
        })
        .catch(error => {
            next(error);
        });
});

// Ruta para agregar una valoración a un evento
router.post("/:id/ratings", isLoggedIn, (req, res, next) => {
    const eventId = req.params.id;
    const { userId, value } = req.body;

    HistoricalEvent.findById(eventId)
        .then(event => {
            if (!event) {
                return res.status(404).json({ error: "Event not found" });
            }

            // Agregar valoración al evento
            event.ratings.push({ user: userId, value });
            return event.save();
        })
        .then(updatedEvent => {
            res.status(201).json({ message: "Valoración agregada correctamente", updatedEvent });
        })
        .catch(error => {
            next(error);
        });
});
module.exports = router;
