// eventsController.routes.js
const express = require("express");
const router = express.Router();
const HistoricalEvent = require("../models/HistoricalEvent.model");
const isLoggedIn = require("../middleware/isLoggedIn");

// Ruta para ver los comentarios de un evento
router.get("/:id/comments", isLoggedIn, (req, res, next) => {
    const eventId = req.params.id;

    HistoricalEvent.findById(eventId)
        .populate('comments.author', 'username')
        // .populate('ratings.user', 'username') 
        .then(event => {
            if (!event) {
                return res.status(404).json({ error: "Event not found" });
            }

            // Accede a los comentarios del evento
            const comments = event.comments;

            res.render("event-comments", { event, comments });
        })
        .catch(error => {
            next(error);
        });
});

module.exports = router;

