const express = require("express");
const router = express.Router();
const { HistoricalEvent, Comment, Rating }  = require("../models/HistoricalEvent.model");
const isLoggedIn = require("../middleware/isLoggedIn");


router.get('/:id/event-comments', isLoggedIn, (req, res, next) => {
    const eventId = req.params.id;
    HistoricalEvent.findById(eventId)
        .populate('comments.author', 'username')
        .then(event => {
            if (!event) {
                return res.status(404).json({ error: "Event not found" });
            }

            res.render('events/event-comments', { event });
        })
        .catch(error => {
            res.status(500).json({ error: "Internal Server Error" });
        });
});


// Ruta para agregar comentarios y valoraciones a un evento
router.post("/:id/comments", isLoggedIn, (req, res, next) => {
    const eventId = req.params.id;
    const { userId, content, value } = req.body;
    
    HistoricalEvent.findById(eventId)
        .populate('comments.author', 'username') 
        .populate('ratings.user', 'username')  
        .then(event => {
            if (!event) {
                return res.status(404).json({ error: "Event not found" });
            }

            // Verifica si se proporcionó contenido (comentario) y agrega el comentario al evento
            if (content) {
                event.comments.push({ author: userId, content });
            }

            // Verifica si se proporcionó valor (rating) y agrega la valoración al evento
            if (value) {
                event.ratings.push({ user: userId, value });
            }

            return event.save();
        })
        .then(updatedEvent => {
            // Devuelve una respuesta indicando que la interacción se realizó correctamente
            res.status(201).json({ message: "Interacción agregada correctamente", updatedEvent });

            // Mueve la redirección aquí
            const rutaRedireccion = `/events/${eventId}`;
            res.redirect(rutaRedireccion);
        })
        .catch(error => {
            next(error);
            res.status(500).json({ error: "Internal Server Error" });
        });
});


module.exports = router;
